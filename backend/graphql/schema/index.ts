const { gql } = require('apollo-server-express');

export const authTypes = gql`
  directive @hasRole(roles: [Role!]) on FIELD_DEFINITION | FIELD
  enum Role {
    superuser
    user
  }
  # Input data
  input userInput {
    username: String!
    password: String!
  }

  # response data
  type LoginResponse {
    accessToken: String
    user: Users
    error: Error
  }

  type Users {
    _id: ID!
    username: String!
    lastlogin: DateTime
    loggedIn: Boolean
    role: [String]!
  }

  type Register {
    username: String!
    password: String!
  }

  type Error {
    userId: ID
    message: String
  }

  type permissionTestData {
    message: String!
  }

  extend type Mutation {
    register(registerData: userInput!): Boolean
    login(loginData: userInput!): LoginResponse
  }

  extend type Query {
    me: Users
    superuser: Users @hasRole(roles: [superuser])
    userRoleData: permissionTestData! @hasRole(roles: [user])
    superUserRoleData: permissionTestData! @hasRole(roles: [superuser])
  }
`;
