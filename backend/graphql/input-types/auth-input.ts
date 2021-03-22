import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class ToggleSuperuserInput {
  @Field(() => ID)
  id: string;
}
