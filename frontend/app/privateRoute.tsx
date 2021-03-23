import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMeQuery } from 'frontend/graphql/generated/dist';
import Spinner from 'frontend/components/spinner';

interface PrivateRoute {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<PrivateRoute> = (props): JSX.Element => {
  const { loading, error, data: { me } = { me: null } } = useMeQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <Spinner />;
  if (error) return <Redirect to={{ pathname: '/login' }} />;

  return me ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to='/login' />;
};

export default PrivateRoute;
