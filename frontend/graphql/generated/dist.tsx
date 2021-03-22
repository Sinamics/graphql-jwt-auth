import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Error = {
  __typename?: 'Error';
  userId?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  error?: Maybe<Error>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  register?: Maybe<Scalars['Boolean']>;
  login?: Maybe<LoginResponse>;
};


export type MutationRegisterArgs = {
  registerData: UserInput;
};


export type MutationLoginArgs = {
  loginData: UserInput;
};

export type PermissionTestData = {
  __typename?: 'permissionTestData';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  me?: Maybe<Users>;
  superuser?: Maybe<Users>;
  userRoleData: PermissionTestData;
  superUserRoleData: PermissionTestData;
};

export type Register = {
  __typename?: 'Register';
  username: Scalars['String'];
  password: Scalars['String'];
};

export enum Role {
  Superuser = 'superuser',
  User = 'user'
}

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
};


export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  _id: Scalars['ID'];
  username: Scalars['String'];
  lastlogin?: Maybe<Scalars['DateTime']>;
  loggedIn?: Maybe<Scalars['Boolean']>;
  role: Array<Maybe<Scalars['String']>>;
};

export type LoginMutationVariables = Exact<{
  loginData: UserInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'userId' | 'message'>
    )>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, '_id' | 'username' | 'role' | 'loggedIn'>
    )> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  registerData: UserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, '_id' | 'username' | 'role' | 'lastlogin'>
  )> }
);

export type UserRoleDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UserRoleDataQuery = (
  { __typename?: 'Query' }
  & { userRoleData: (
    { __typename?: 'permissionTestData' }
    & Pick<PermissionTestData, 'message'>
  ) }
);

export type SuperUserRoleDataQueryVariables = Exact<{ [key: string]: never; }>;


export type SuperUserRoleDataQuery = (
  { __typename?: 'Query' }
  & { superUserRoleData: (
    { __typename?: 'permissionTestData' }
    & Pick<PermissionTestData, 'message'>
  ) }
);

export type SuperuserQueryVariables = Exact<{ [key: string]: never; }>;


export type SuperuserQuery = (
  { __typename?: 'Query' }
  & { superuser?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, '_id' | 'username' | 'role'>
  )> }
);


export const LoginDocument = gql`
    mutation login($loginData: userInput!) {
  login(loginData: $loginData) {
    accessToken
    error {
      userId
      message
    }
    user {
      _id
      username
      role
      loggedIn
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginData: // value for 'loginData'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($registerData: userInput!) {
  register(registerData: $registerData)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerData: // value for 'registerData'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    _id
    username
    role
    lastlogin
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserRoleDataDocument = gql`
    query userRoleData {
  userRoleData {
    message
  }
}
    `;

/**
 * __useUserRoleDataQuery__
 *
 * To run a query within a React component, call `useUserRoleDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRoleDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRoleDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserRoleDataQuery(baseOptions?: Apollo.QueryHookOptions<UserRoleDataQuery, UserRoleDataQueryVariables>) {
        return Apollo.useQuery<UserRoleDataQuery, UserRoleDataQueryVariables>(UserRoleDataDocument, baseOptions);
      }
export function useUserRoleDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRoleDataQuery, UserRoleDataQueryVariables>) {
          return Apollo.useLazyQuery<UserRoleDataQuery, UserRoleDataQueryVariables>(UserRoleDataDocument, baseOptions);
        }
export type UserRoleDataQueryHookResult = ReturnType<typeof useUserRoleDataQuery>;
export type UserRoleDataLazyQueryHookResult = ReturnType<typeof useUserRoleDataLazyQuery>;
export type UserRoleDataQueryResult = Apollo.QueryResult<UserRoleDataQuery, UserRoleDataQueryVariables>;
export const SuperUserRoleDataDocument = gql`
    query superUserRoleData {
  superUserRoleData {
    message
  }
}
    `;

/**
 * __useSuperUserRoleDataQuery__
 *
 * To run a query within a React component, call `useSuperUserRoleDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuperUserRoleDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuperUserRoleDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useSuperUserRoleDataQuery(baseOptions?: Apollo.QueryHookOptions<SuperUserRoleDataQuery, SuperUserRoleDataQueryVariables>) {
        return Apollo.useQuery<SuperUserRoleDataQuery, SuperUserRoleDataQueryVariables>(SuperUserRoleDataDocument, baseOptions);
      }
export function useSuperUserRoleDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuperUserRoleDataQuery, SuperUserRoleDataQueryVariables>) {
          return Apollo.useLazyQuery<SuperUserRoleDataQuery, SuperUserRoleDataQueryVariables>(SuperUserRoleDataDocument, baseOptions);
        }
export type SuperUserRoleDataQueryHookResult = ReturnType<typeof useSuperUserRoleDataQuery>;
export type SuperUserRoleDataLazyQueryHookResult = ReturnType<typeof useSuperUserRoleDataLazyQuery>;
export type SuperUserRoleDataQueryResult = Apollo.QueryResult<SuperUserRoleDataQuery, SuperUserRoleDataQueryVariables>;
export const SuperuserDocument = gql`
    query superuser {
  superuser {
    _id
    username
    role
  }
}
    `;

/**
 * __useSuperuserQuery__
 *
 * To run a query within a React component, call `useSuperuserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuperuserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuperuserQuery({
 *   variables: {
 *   },
 * });
 */
export function useSuperuserQuery(baseOptions?: Apollo.QueryHookOptions<SuperuserQuery, SuperuserQueryVariables>) {
        return Apollo.useQuery<SuperuserQuery, SuperuserQueryVariables>(SuperuserDocument, baseOptions);
      }
export function useSuperuserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuperuserQuery, SuperuserQueryVariables>) {
          return Apollo.useLazyQuery<SuperuserQuery, SuperuserQueryVariables>(SuperuserDocument, baseOptions);
        }
export type SuperuserQueryHookResult = ReturnType<typeof useSuperuserQuery>;
export type SuperuserLazyQueryHookResult = ReturnType<typeof useSuperuserLazyQuery>;
export type SuperuserQueryResult = Apollo.QueryResult<SuperuserQuery, SuperuserQueryVariables>;