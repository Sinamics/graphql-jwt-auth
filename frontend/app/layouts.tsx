/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useMeQuery } from 'frontend/graphql/generated/dist';
import Spinner from 'frontend/components/spinner';

interface LayoutProps {
  children: React.ReactNode;
}

export const LayoutAuthenticated: React.ElementType<LayoutProps> = (props): JSX.Element => {
  // Load Me object with network-only so we update the cache if the users log-out and in with another user account!.
  const { loading } = useMeQuery({ fetchPolicy: 'network-only' });
  if (loading) return <Spinner />;

  return (
    <Suspense fallback={<Spinner />}>
      <div className='main'>{props.children}</div>
    </Suspense>
  );
};

export const LayoutPublic: React.ElementType<LayoutProps> = (props): JSX.Element => {
  // Load Me object with network-only if user has a valid refreshToken / cookie in browser.
  const { loading, data: { me = null } = {} } = useMeQuery({ fetchPolicy: 'network-only' });
  if (loading) return <Spinner />;

  // If a valid refresh token is present, the ME oject is available, hence rute the user directly to privateroute.
  if (me)
    return (
      <Redirect
        to={{
          pathname: '/privateroute',
        }}
      />
    );
  return (
    <Suspense fallback={<Spinner />}>
      <div className='homepage'>{props.children}</div>
    </Suspense>
  );
};

export const LayoutAnonymous: React.ElementType<LayoutProps> = (props) => {
  return (
    <Suspense fallback={<Spinner />}>
      <div className='anonymous'>{props.children}</div>
    </Suspense>
  );
};
