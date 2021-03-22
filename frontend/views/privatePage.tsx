import React from 'react';
import { useMeQuery, useSuperUserRoleDataQuery, useToggleSuperuserMutation, useUserRoleDataQuery } from 'frontend/graphql/generated/dist';
import { setAccessToken } from '../utils/accessToken';

//@ts-ignore
import { apiUrl } from 'config';

interface props {
  history: any;
}
const PrivatePage = ({ history }: props): React.ReactNode => {
  const { data: userdata, error: usererror } = useUserRoleDataQuery();
  const { data: superUserData, error: superUserError } = useSuperUserRoleDataQuery();

  const [toggleSuperUser] = useToggleSuperuserMutation();

  const { loading, error, data: { me } = { me: Object } }: any = useMeQuery();

  const LogOut = async () => {
    setAccessToken('');
    await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return history.push('login');
  };

  if (loading) return <div>Loading Me..</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className='container'>
      <div className='d-flex justify-content-between m-5'>
        <button
          className='btn btn-primary'
          onClick={() =>
            toggleSuperUser({ variables: { user: { id: me?.data?.id } } })
              .then(() => window.location.reload())
              .catch((err) => console.log(err))
          }
        >
          Toggle Admin Permission
        </button>
        <button className='btn btn-danger' onClick={LogOut}>
          Logout
        </button>
      </div>
      <div className='d-flex justify-content-between'>
        <div>
          <h3>Hey {me?.data?.username}</h3>
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
