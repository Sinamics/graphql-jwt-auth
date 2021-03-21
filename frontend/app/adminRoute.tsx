/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSuperuserQuery } from 'frontend/graphql/generated/dist';

interface props {
  component: React.ElementType;
  path: string;
}

const AdminRoute: React.FC<{ component: React.FC<props>; path: string; exact: boolean }> = (props): JSX.Element => {
  const { loading, error, data: { superuser = {} } = {} } = useSuperuserQuery();
  console.log(superuser);
  if (loading) return <div>Loading Admin privileges</div>;

  if (!superuser) return <Redirect to={{ pathname: '/dashboard' }} />;
  if (error) return <div>`${error}`</div>;
  console.log(superuser);
  // let admin = !!superuser?.role?.includes(config.superUser);

  return true ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to='/dashboard' />;
};
export default AdminRoute;
