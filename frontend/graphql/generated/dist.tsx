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
};

export type Query = {
  __typename?: 'Query';
  me: UserResponse;
  superuser?: Maybe<UserResponse>;
  userRoleData?: Maybe<PermissionTestResponse>;
  superUserRoleData?: Maybe<PermissionTestResponse>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  data?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  password: Scalars['String'];
  tokenVersion: Scalars['String'];
  createdDate: Scalars['String'];
  lastlogin: Scalars['String'];
  role: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  path?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type PermissionTestResponse = {
  __typename?: 'PermissionTestResponse';
  message?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  register: UserResponse;
};


export type MutationLoginArgs = {
  loginData: UserInput;
};


export type MutationRegisterArgs = {
  registerData: UserInput;
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginData: UserInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'accessToken'>
    & { data?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'role'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  registerData: UserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { data?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserResponse' }
    & { data?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) }
);

export type UserRoleDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UserRoleDataQuery = (
  { __typename?: 'Query' }
  & { userRoleData?: Maybe<(
    { __typename?: 'PermissionTestResponse' }
    & Pick<PermissionTestResponse, 'message'>
  )> }
);

export type SuperUserRoleDataQueryVariables = Exact<{ [key: string]: never; }>;


export type SuperUserRoleDataQuery = (
  { __typename?: 'Query' }
  & { superUserRoleData?: Maybe<(
    { __typename?: 'PermissionTestResponse' }
    & Pick<PermissionTestResponse, 'message'>
  )> }
);

export type SuperuserQueryVariables = Exact<{ [key: string]: never; }>;


export type SuperuserQuery = (
  { __typename?: 'Query' }
  & { superuser?: Maybe<(
    { __typename?: 'UserResponse' }
    & { data?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'role'>
    )> }
  )> }
);


export const LoginDocument = gql`
    mutation login($loginData: UserInput!) {
  login(loginData: $loginData) {
    accessToken
    data {
      id
      username
      role
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
    mutation register($registerData: UserInput!) {
  register(registerData: $registerData) {
    data {
      username
    }
  }
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
    data {
      username
    }
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
    data {
      id
      username
      role
    }
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