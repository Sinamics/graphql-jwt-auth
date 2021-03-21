/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

// @ts-ignore
// import config from 'config';
import { useMeQuery } from 'client/graphql/generated/dist';

interface PrivateRouteProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props): JSX.Element => {
  const { loading, error, data: { me } = { me: null } } = useMeQuery({
    nextFetchPolicy: 'network-only',
  });

  if (loading) return <div>Loading User privileges</div>;
  if (error) return <Redirect to={{ pathname: '/login' }} />;

  return me ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to='/login' />;
};
export default PrivateRoute;
