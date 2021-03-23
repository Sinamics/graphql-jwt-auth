/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMeQuery } from 'frontend/graphql/generated/dist';
import config from 'config';

interface RouteProps {
  component: React.ElementType;
  path: string;
}

const AdminRoute: React.FC<{ component: React.FC<RouteProps>; path: string; exact: boolean }> = (props): JSX.Element => {
  const { loading, error, data: { me } = { me: null } } = useMeQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <div>Loading Admin privileges</div>;

  if (!me) return <Redirect to={{ pathname: '/login' }} />;
  if (error) return <div>`${error}`</div>;

  const admin = !!me?.data?.role.includes(config.superUser);

  return admin ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to='/login' />;
};
export default AdminRoute;
