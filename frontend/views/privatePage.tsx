import React from 'react';
import { useMeQuery, useSuperUserRoleDataQuery, useToggleSuperuserMutation, useUserRoleDataQuery } from 'frontend/graphql/generated/dist';
import { setAccessToken } from '../utils/accessToken';
import { RouteComponentProps } from 'react-router';
import { apiUrl } from 'config';
import classNames from 'classnames';

const PrivatePage: React.FC<RouteComponentProps> = ({ history }) => {
  const { data: userdata, error: usererror, loading: userDataLoading } = useUserRoleDataQuery();
  const { data: superUserData, error: superUserError, loading: superuserDataLoading, refetch } = useSuperUserRoleDataQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const [toggleSuperUser] = useToggleSuperuserMutation();

  const { error: meError, data: { me } = { me: Object } }: any = useMeQuery();

  const LogOut = async () => {
    setAccessToken('');
    await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => history.push('login'));
  };

  const showSuperuserAlert = classNames({
    hidden: !superUserError?.message,
  });
  const showUserAlert = classNames({
    hidden: !usererror?.message,
  });
  return (
    <div className='py-20 h-screen bg-gray-100 px-4 sm:px-6 lg:px-8'>
      {meError?.message}

      <div className='flex justify-around'>
        <button
          disabled={superuserDataLoading || userDataLoading}
          onClick={() =>
            toggleSuperUser({ variables: { user: { id: me?.data?.id } } })
              .then(() => refetch())
              .catch((err) => console.log(err))
          }
          className='p-3 bg-blue-400 hover:bg-blue-600 rounded-lg text-lg focus:outline-none shadow-lg'
        >
          Toggle Role Permission
        </button>
        <button onClick={LogOut} className='p-3 bg-red-400 hover:bg-red-600 rounded-lg text-lg focus:outline-none shadow-lg'>
          LogOut
        </button>
      </div>
      <div className='flex justify-center gap-5'>
        <div className='max-w-md w-full bg-white p-5 shadow-xl my-10 border rounded-md '>
          <p className='text-2xl pb-4'>Hey {me?.data?.username}</p>
          <pre className='text-sm text-gray-700'>{JSON.stringify(me, null, 2)}</pre>
        </div>
        <div className='max-w-md w-full bg-white p-5 shadow-xl my-10 border rounded-md'>
          <div className='text-2xl'>{superUserData?.superUserRoleData?.message}</div>
          <div className={` ${showSuperuserAlert} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`} role='alert'>
            <span className='block sm:inline text-2xl'>{superUserError?.message}</span>
          </div>
        </div>
        <div className='max-w-md w-full bg-white p-5 shadow-xl my-10 border rounded-md'>
          <div className='text-2xl'>{userdata?.userRoleData?.message}</div>
          <div className={`${showUserAlert} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`} role='alert'>
            <span className='block sm:inline text-2xl'>{usererror?.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
