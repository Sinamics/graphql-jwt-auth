import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../utils/accessToken';
import { useLoginMutation } from '../graphql/generated/dist';
// import { toErrorMap } from 'frontend/utils/errorMap';

interface StateProps {
  username: string;
  password: string;
}

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useState<StateProps>({ username: '', password: '' });

  const [login, { loading: loginLoading, data: loginResponse }] = useLoginMutation({ errorPolicy: 'all' });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();

    await login({
      variables: { loginData: { ...user } },
    })
      .then(({ data }) => {
        if (data?.login.errors?.length) return;

        if (data && data.login) {
          setAccessToken(data.login.accessToken).then(() => {
            history.push('/privateroute');
          });
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img className='mx-auto h-12 w-auto' src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg' alt='Workflow' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
        </div>
        <div className='max-w-md '>
          {loginResponse?.login.errors?.length && <p className='text-red-500 '>{loginResponse.login.errors[0].message}</p>}
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Username
              </label>

              <input
                onChange={handleChange}
                name='username'
                type='text'
                placeholder='Username'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-200 focus:z-10 sm:text-sm'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                onChange={handleChange}
                name='password'
                type='password'
                placeholder='Password'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-200 focus:z-10 sm:text-sm'
              />
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <div className='text-sm'>
              <Link to='register'>
                <label color='teal' className='text-right'>
                  Already have an account?
                </label>
              </Link>
            </div>
          </div>

          <div>
            <button
              disabled={loginLoading}
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <svg
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fill-rule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clip-rule='evenodd'
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
