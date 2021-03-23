import React from 'react';
import { useMeQuery, useSuperUserRoleDataQuery, useToggleSuperuserMutation, useUserRoleDataQuery } from 'frontend/graphql/generated/dist';
import { setAccessToken } from '../utils/accessToken';
import { RouteComponentProps } from 'react-router';

//@ts-ignore
import { apiUrl } from 'config';

const PrivatePage: React.FC<RouteComponentProps> = ({ history }) => {
  const { data: userdata, error: usererror } = useUserRoleDataQuery();
  const { data: superUserData, error: superUserError } = useSuperUserRoleDataQuery();

  const [toggleSuperUser] = useToggleSuperuserMutation();

  const { error, data: { me } = { me: Object } }: any = useMeQuery();

  const LogOut = async () => {
    setAccessToken('');
    await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => history.push('login'));
  };

  if (error) return <div className='text-danger d-flex justify-content-center'>{error.message}</div>;

  return (
    <div className='container'>
      <div className='d-flex justify-content-between m-5'>
        <button
          className='btn btn-primary'
          onClick={() =>
            toggleSuperUser({ variables: { user: { id: me?.data?.id } } })
              // TODO just for testing purpose.. :)
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
