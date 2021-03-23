import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';

export enum UserRole {
  SUPERUSER = 'superuser',
  USER = 'user',
}

@ObjectType({ isAbstract: true })
@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  hash: string;

  @Column()
  @Field()
  tokenVersion: string;

  @Column()
  @Field()
  createdDate: Date = new Date();

  @Field()
  @Column()
  lastseen: Date;

  @Field(() => [String], { nullable: false })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  //@ts-ignore
  role: UserRole = [UserRole.USER];
}
