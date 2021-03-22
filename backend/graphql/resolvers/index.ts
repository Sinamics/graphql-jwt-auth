// import { register, login } from '../auth.service';
// import isAuthenticated from '../../middleware/authorization/user.is.authenticated';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { Resolver, Mutation, Query, Ctx, Arg, Directive } from 'type-graphql';
import { User } from '../entity/Users';
import { UserInput } from '../input-types/auth-input';
import { PermissionTestSuperuserResponse, PermissionTestUserResponse, UserResponse } from '../response-types/auth-response';
import isAuthenticated from '../../middleware/authorization/user.is.authenticated';
import bcrypt from 'bcryptjs';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../jwt/validate.token';
import { nameLength } from '../../_helpers/name-validation';

const mediumPassword = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

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

  @Query(() => UserResponse, { nullable: true })
  async superuser(@Ctx() ctx: MyContext): Promise<User | undefined> {
    return User.findOne(1);
  }

  @Directive('@hasRole(roles: [user])')
  @Query(() => PermissionTestUserResponse, { nullable: true })
  async userRoleData() {
    return { message: 'Hey from backend' };
  }

  @Directive('@hasRole(roles: [superuser])')
  @Query(() => PermissionTestSuperuserResponse, { nullable: true })
  async superUserRoleData() {
    return { message: 'Hey from backend' };
  }

  @Mutation(() => UserResponse)
  async login(@Ctx() ctx: any, @Arg('loginData') { username, password }: UserInput): Promise<any> {
    try {
      const user = await User.findOne({ username });

      if (!user) throw new AuthenticationError('username or password is wrong!');

      const valid = bcrypt.compareSync(password, user.hash);
      if (!valid) throw new AuthenticationError('username or password is wrong!');

      // Send refresh token as cookie header
      sendRefreshToken(ctx?.res, createRefreshToken(user));

      // Send accessToken back to user. This will be stored in-memory
      return {
        accessToken: createAccessToken(user),
        data: user,
      };
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Mutation(() => UserResponse)
  async register(@Arg('registerData') { username, password }: UserInput): Promise<any> {
    // username validation
    if (!username) return new AuthenticationError(`username required!`);
    if (username.length <= 3) return new AuthenticationError(`username must be more than 3 characters!`);
    if (nameLength(username, 30)) return new AuthenticationError(`Max 30 char in username`);

    if (await User.findOne({ username })) {
      // eslint-disable-next-line no-throw-literal
      throw new AuthenticationError(`username "${username}" already taken`);
    }

    const user = await User.create({ username });

    if (password) {
      if (!mediumPassword.test(password)) return new AuthenticationError(`Password does not meet the requirements!`);
      // Valid Password, lets hash it
      user.hash = bcrypt.hashSync(password, 10);
    }

    return { data: await user.save() };
  }
}
