/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMeQuery } from 'frontend/graphql/generated/dist';
import config from 'config';
import Spinner from 'frontend/components/spinner';

interface RouteProps {
  component: React.ElementType;
  path: string;
}

const AdminRoute: React.FC<{ component: React.FC<RouteProps>; path: string; exact: boolean }> = (props): JSX.Element => {
  const { loading, error, data: { me } = { me: null } } = useMeQuery();

  if (loading) return <Spinner />;

  if (!me) return <Redirect to={{ pathname: '/login' }} />;
  if (error) return <div>`${error}`</div>;

  const admin = !!me?.data?.role.includes(config.superUser);

  return admin ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to='/login' />;
};
export default AdminRoute;
