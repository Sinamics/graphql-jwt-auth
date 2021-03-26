import classNames from 'classnames';
import { toErrorMap } from 'frontend/utils/errorMap';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRegisterMutation, UserResponse } from '../graphql/generated/dist';

interface StateProps {
  username: string;
  password: string;
}

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useState<StateProps>({
    username: '',
    password: '',
  });

  const [userSignUp, { loading: registerLoading, data: registerResponse }] = useRegisterMutation({ errorPolicy: 'all' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    await userSignUp({ variables: { registerData: { ...user } } })
      .then(({ data }) => {
        if (data?.register.errors?.length) return;

        history.push('login');
      })
      .catch((err) => console.error(err));
  };

  const { errors = [] }: UserResponse | any = registerResponse?.register || [];

  const usernameErrorClass = classNames({
    'border-red-300': toErrorMap(errors, 'username'),
  });
  const passwordErrorClass = classNames({
    'border-red-300': toErrorMap(errors, 'password'),
  });

  return (
    <div className='flex flex-col items-center py-20 h-screen bg-gray-100 px-4 sm:px-6 lg:px-8  '>
      <div className='max-w-7xl w-full'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://www.flaticon.com/svg/vstatic/svg/564/564419.svg?token=exp=1616753275~hmac=ac3a73006f3efabe1da0450cb28ed209'
            alt='Homepage Logo'
          />
          <h2 className={`mt-6 text-center xl:text-6xl sm:text-3xl font-extrabold text-gray-600`}>Signup for a new account</h2>
        </div>
      </div>
      <div className='max-w-md w-full bg-white p-5 shadow-xl my-10 border rounded-md'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <input type='hidden' name='remember' value='true' />
          <div className='text-center'>
            <label className='max-w-md text-md ml-1 text-red-500'>{toErrorMap(errors, 'account')}</label>
          </div>
          <div className='rounded-md shadow-sm'>
            <div className='my-5'>
              <label htmlFor='email-address' className='sr-only'>
                Username
              </label>

              <input
                onChange={handleChange}
                name='username'
                type='text'
                placeholder='Username'
                className={` ${usernameErrorClass} appearance-none rounded-md sm:text-sm lg:text-lg relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-200 focus:z-10 `}
              />
              <label className='max-w-md text-center text-sm ml-1 text-red-500'>{toErrorMap(errors, 'username')}</label>
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
                className={`${passwordErrorClass} appearance-none rounded-md relative lg:text-lg block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-200 focus:z-10 sm:text-sm`}
              />
              <label className='max-w-md text-center text-sm ml-1 text-red-500'>{toErrorMap(errors, 'password')}</label>
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <Link to='login'>
              <div className='text-sm'>
                <label className='text-right text-blue-400 cursor-pointer '>Already have an account?</label>
              </div>
            </Link>
          </div>

          <div>
            <button
              disabled={registerLoading}
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <svg
                  className='h-5 w-5 text-green-500 group-hover:text-green-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clipRule='evenodd'
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

export default SignUp;
