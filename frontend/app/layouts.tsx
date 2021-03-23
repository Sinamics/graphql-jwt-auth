/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useMeQuery } from 'frontend/graphql/generated/dist';
import { Dimmer, Loader } from 'semantic-ui-react';

export const LayoutAuthenticated = withRouter((props: any): any => {
  // const { loading, data: { me = {} } = {} }: any = useMeQuery({ fetchPolicy: 'network-only' });

  // if (loading) return <div>Loading...</div>;
  return (
    <Suspense
      fallback={
        <Dimmer page inverted active>
          <Loader size='large' active inline='centered'>
            Loading
          </Loader>
        </Dimmer>
      }
    >
      <div className='main'>{props.children}</div>
    </Suspense>
  );
});

interface LayoutProps {
  children: React.ReactNode;
}

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
    <Suspense
      fallback={
        <Dimmer page inverted active>
          <Loader size='large' active inline='centered'>
            Loading
          </Loader>
        </Dimmer>
      }
    >
      <div className='homepage'>{props.children}</div>
    </Suspense>
  );
};

export const LayoutAnonymous: React.ElementType<LayoutProps> = (props) => {
  return (
    <Suspense
      fallback={
        <Dimmer page inverted active>
          <Loader size='large' active inline='centered'>
            Loading
          </Loader>
        </Dimmer>
      }
    >
      <div className='anonymous'>{props.children}</div>
    </Suspense>
  );
};
