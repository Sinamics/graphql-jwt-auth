/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useMeQuery } from 'frontend/graphql/generated/dist';
import Spinner from 'frontend/components/spinner';

interface LayoutProps {
  children: React.ReactNode;
}

export const LayoutAuthenticated: React.ElementType<LayoutProps> = (props): JSX.Element => {
  // const { loading, data: { me = {} } = {} }: any = useMeQuery({ fetchPolicy: 'network-only' });

  // if (loading) return <div>Loading...</div>;
  return (
    <Suspense fallback={<Spinner />}>
      <div className='main'>{props.children}</div>
    </Suspense>
  );
};

export const LayoutPublic: React.ElementType<LayoutProps> = (props): JSX.Element => {
  const { loading, data: { me = null } = {} }: any = useMeQuery({ fetchPolicy: 'network-only' });
  if (loading) return <div>Loading Me...</div>;

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
