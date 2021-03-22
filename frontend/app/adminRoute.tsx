/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSuperuserQuery } from 'frontend/graphql/generated/dist';

// @ts-ignore
import config from 'config';

interface props {
  component: React.ElementType;
  path: string;
}

const AdminRoute: React.FC<{ component: React.FC<props>; path: string; exact: boolean }> = (props): JSX.Element => {
  const { loading, error, data } = useSuperuserQuery();

  if (loading) return <div>Loading Admin privileges</div>;

  if (!data) return <Redirect to={{ pathname: '/dashboard' }} />;
  if (error) return <div>`${error}`</div>;

  const admin = !!data?.superuser?.data?.role.includes(config.superUser);

  return admin ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to='/dashboard' />;
};
export default AdminRoute;
