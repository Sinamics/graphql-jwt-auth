import { ObjectType, Field, ID } from 'type-graphql';
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
export class PermissionTestUserResponse {
  @Field(() => String)
  message: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class PermissionTestSuperuserResponse {
  @Field(() => String)
  message: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
