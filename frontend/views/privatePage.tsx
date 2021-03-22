import React from 'react';
import { useMeQuery, useSuperUserRoleDataQuery, useUserRoleDataQuery } from 'frontend/graphql/generated/dist';
import { setAccessToken } from '../utils/accessToken';

//@ts-ignore
import { apiUrl } from 'config';

interface props {
  history: any;
}
const PrivatePage = ({ history }: props): React.ReactNode => {
  const { data: userdata, error: usererror } = useUserRoleDataQuery();
  const { data: superUserData, error: superUserError } = useSuperUserRoleDataQuery();

  const { loading, error, data: { me } = { me: null } } = useMeQuery();

  const LogOut = () => {
    setAccessToken('');
    return fetch(`${apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => history.push('login'));
  };

  if (loading) return <div>Loading Me..</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className='container'>
      <div className='d-flex justify-content-end m-5'>
        <button className='btn btn-danger' onClick={LogOut}>
          Logout
        </button>
      </div>
      <div className='d-flex justify-content-between'>
        <div>
          <h3>Hey {me?.username}</h3>
          <pre>{JSON.stringify(me, null, 2)}</pre>
        </div>
        <div>
          <h3>Admin Data</h3>
          <div>{superUserData?.superUserRoleData?.message}</div>
          <div className='text-danger'>{superUserError?.message}</div>
        </div>
        <div>
          <h3>User Data</h3>
          <div>{userdata?.userRoleData?.message}</div>
          <div className='text-danger'>{usererror?.message}</div>
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
