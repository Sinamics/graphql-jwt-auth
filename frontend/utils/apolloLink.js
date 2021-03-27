import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloLink, Observable } from 'apollo-link';
import { WebSocketLink } from '@apollo/client/link/ws';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import config from 'config';
import { getAccessToken, setAccessToken } from './accessToken';

const cache = new InMemoryCache({});

const httpLink = new HttpLink({
  uri: `${config.apiUrl}/graphql`,
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: `${config.wsUrl}/subscription`,
  options: {
    reconnect: true,
    credentials: 'include',
  },
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const TokenRefresh = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${config.apiUrl}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: ApolloLink.from([
    TokenRefresh,
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    splitLink,
  ]),
  cache,
});
