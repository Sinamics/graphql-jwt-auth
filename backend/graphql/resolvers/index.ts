import { AuthenticationError } from 'apollo-server-express';
import { Resolver, Mutation, Query, Ctx, Arg, Directive } from 'type-graphql';
import { User, UserRole } from '../entity/Users';
import { ToggleSuperuserInput, UserInput } from '../input-types/auth-input';
import { PermissionTestSuperuserResponse, PermissionTestUserResponse, UserResponse } from '../response-types/auth-response';
import isAuthenticated from '../../jwt/user.is.authenticated';
import bcrypt from 'bcryptjs';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../jwt/validate.token';
import validator from 'validator';
import { mediumPassword } from '../../_helpers/name-validation';
import { FieldError } from '../response-types/field-error';

export interface MyContext {
  req: Request;
  res: Response;
}

@Resolver()
export class authResolvers {
  @Query(() => UserResponse)
  async me(@Ctx() ctx: any) {
    return { data: await isAuthenticated({ ...ctx }) };
  }

  @Directive('@hasRole(roles: [user, superuser])')
  @Query(() => PermissionTestUserResponse)
  async userRoleData() {
    return { message: 'Hey user !' };
  }

  @Directive('@hasRole(roles: [superuser])')
  @Query(() => PermissionTestSuperuserResponse)
  async superUserRoleData() {
    return { message: 'Hey SuperUser, whats up!' };
  }

  @Mutation(() => UserResponse)
  async login(@Ctx() ctx: any, @Arg('loginData') { username, password }: UserInput): Promise<UserResponse | AuthenticationError> {
    const errors: FieldError[] = [];

    try {
      if (validator.isEmpty(username)) {
        errors.push({ field: ['username'], message: 'Must not be empty.' });
      }

      if (validator.isEmpty(password)) {
        errors.push({ field: ['password'], message: 'Must not be empty.' });
      }

      if (errors.length) throw errors;

      const user = await User.findOne({ username });

      if (!user) throw errors.push({ field: ['account'], message: 'User does not exsist!' });

      const valid = bcrypt.compareSync(password, user.hash);
      if (!valid) throw errors.push({ field: ['account'], message: 'Username or Password is wrong!' });

      // Send refresh token as cookie header
      sendRefreshToken(ctx?.res, createRefreshToken(user));

      // Send accessToken back to user. This will be stored in-memory
      return {
        accessToken: createAccessToken(user),
        data: user,
      };
    } catch (err) {
      return { errors };
    }
  }

  @Mutation(() => UserResponse)
  async register(@Arg('registerData') { username, password }: UserInput): Promise<any> {
    const errors: FieldError[] = [];
    try {
      // username validation
      if (validator.isEmpty(username)) {
        errors.push({ field: ['username'], message: 'Must not be empty.' });
      }
      if (!validator.isLength(username, { max: 30 })) {
        errors.push({ field: ['username'], message: 'Must be at a maximum 30 characters long.' });
      }
      if (!validator.isLength(username, { min: 3 })) {
        errors.push({ field: ['username'], message: 'Must be at least 3 characters long.' });
      }

      // password validation
      if (validator.isEmpty(password)) {
        errors.push({ field: ['password'], message: 'The password must not be empty.' });
      }

      if (!mediumPassword.test(password)) {
        errors.push({ field: ['password'], message: 'Must include 6 char, with upper and lowercase' });
      }

      if (await User.findOne({ username })) {
        errors.push({ field: ['account'], message: `username "${username}" already taken` });
      }

      if (errors.length) throw errors;

      const user = await User.create({ username });
      user.hash = bcrypt.hashSync(password, 10);

      return { data: user };
    } catch (err) {
      return { errors };
    }
  }

  @Mutation(() => UserResponse)
  async toggleSuperuser(@Arg('user') { id }: ToggleSuperuserInput): Promise<any> {
    const user = await User.findOne(id);
    user.role = user.role.includes('user') ? [UserRole.SUPERUSER] : ([UserRole.USER] as any);
    return { data: await user.save() };
  }
}
