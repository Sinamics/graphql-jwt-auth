// import { register, login } from '../auth.service';
// import isAuthenticated from '../../middleware/authorization/user.is.authenticated';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { Resolver, Mutation, Query, Ctx, Arg } from 'type-graphql';
import { User } from '../../entity/Users';
import { UserInput } from '../../graphql-input-types/auth-input';
import { PermissionTestResponse, UserResponse } from '../../graphql-response-types/auth-response';
import isAuthenticated from '../../middleware/authorization/user.is.authenticated';
import bcrypt from 'bcryptjs';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../jwt/validate.token';

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

  @Query(() => PermissionTestResponse, { nullable: true })
  async userRoleData() {
    return { message: 'Hey from backend' };
  }

  @Query(() => PermissionTestResponse, { nullable: true })
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
    // await User.create().save();
    // const data = await Endpoint.find();
    // return { data };
  }

  @Mutation(() => UserResponse)
  async register(@Arg('registerData') { username, password }: UserInput): Promise<any> {
    if (await User.findOne({ username })) {
      // eslint-disable-next-line no-throw-literal
      throw new AuthenticationError(`username "${username}" already taken`);
    }

    const user = await User.create({ username });

    if (password) {
      if (!mediumPassword.test(password)) return new Error(`Password does not meet the requirements!`);
      // Valid Password, lets hash it
      user.hash = bcrypt.hashSync(password, 10);
    }

    return { data: await user.save() };
  }
}

// export class authResolvers = {
//   Query: {
//     me: async (_parent: any, _args: any, context: any) => {
//       return isAuthenticated(context);
//     },
//     superuser: async (_parent: any, _args: any, context: any) => {
//       return isAuthenticated(context, 'superuser');
//     },
//     userRoleData: async () => {
//       return { message: 'Hey from backend' };
//     },
//     superUserRoleData: async () => {
//       return { message: 'Hey from backend' };
//     },
//   },
//   Mutation: {
//     login: async (_: any, args: any, context: any) => {
//       return login(args, context);
//     },
//     register: async (_: any, args: any) => {
//       return register(args);
//     },
//   },
// };
