// accessToken: String
// user: Users
// error: Error
import { ObjectType, Field } from 'type-graphql';
import { FieldError } from './field-error';
import { User } from '../entity/Users';

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  accessToken?: String;

  @Field(() => User, { nullable: true })
  data?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class PermissionTestResponse {
  @Field(() => String, { nullable: true })
  message: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
