/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useMeQuery } from 'frontend/graphql/generated/dist';

export const LayoutAuthenticated = withRouter((props: any): any => {
  // const { loading, data: { me = {} } = {} }: any = useMeQuery({ fetchPolicy: 'network-only' });

  // if (loading) return <div>Loading...</div>;
  return (
    <div className='app'>
      <main className='main'>{props.children}</main>
    </div>
  );
});

export const LayoutPublic: React.FC<any> = (props: any): JSX.Element => {
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
    <>
      <div className='homepage'>{props.children}</div>
    </>
  );
};

export const LayoutAnonymous: React.FC<{}> = (props) => {
  return <div>{props.children}</div>;
};
