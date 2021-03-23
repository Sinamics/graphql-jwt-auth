import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

// Layouts
import { LayoutAnonymous, LayoutAuthenticated, LayoutPublic } from './layouts';

// Authorized views
const PrivatePage = React.lazy(() => import('frontend/views/privatePage'));

// AUTH
const PrivateRoute = React.lazy(() => import('./privateRoute'));
const LandingPage = React.lazy(() => import('frontend/views/landingPage'));

// Public Views
const PageLogin = React.lazy(() => import('frontend/views/login'));
const Register = React.lazy(() => import('frontend/views/register'));
const PageNotFound = React.lazy(() => import('frontend/views/pageNotFound'));

const anonymousRoutes = [
  {
    key: 'notfound',
    path: '*',
    component: PageNotFound,
    exact: false,
  },
];

const publicRoutes = [
  {
    key: 'homepage',
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    key: 'login',
    path: '/login',
    component: PageLogin,
    exact: true,
  },
  {
    key: 'register',
    path: '/register',
    component: Register,
    exact: true,
  },
];

const privateRoutes = [
  {
    key: 'privateroute',
    path: '/privateroute',
    component: PrivatePage,
    exact: true,
  },
];

interface PublicRouteProps {
  component: React.FC;
  path: string;
  exact: boolean;
}
const PublicRoute: React.FC<PublicRouteProps> = (props): JSX.Element => {
  const { component: Component, ...restProps } = props;

  if (!Component) return <div />;
  // If we need to validate public routes, lets do it here.  Allowing all for now.
  let valid = true;
  return (
    <Route
      {...restProps}
      render={(routeRenderProps: any) =>
        valid ? (
          <Component {...routeRenderProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeRenderProps.location },
            }}
          />
        )
      }
    />
  );
};

const Routes: React.FC<React.ReactNode> = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path={['/privateroute']}>
          <LayoutAuthenticated>
            <Switch>
              {privateRoutes.map((privateRouteProps: any) => (
                <PrivateRoute {...privateRouteProps} />
              ))}
            </Switch>
          </LayoutAuthenticated>
        </Route>

        <Route exact path={['/', '/login', '/register']}>
          <LayoutPublic>
            <Switch>
              {publicRoutes.map((publicRouteProps: any) => (
                <PublicRoute {...publicRouteProps} />
              ))}
            </Switch>
          </LayoutPublic>
        </Route>

        <Route path={['*']}>
          <LayoutAnonymous>
            <Switch>
              {anonymousRoutes.map((anonymousRoutes) => (
                <PublicRoute {...anonymousRoutes} />
              ))}
            </Switch>
          </LayoutAnonymous>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
