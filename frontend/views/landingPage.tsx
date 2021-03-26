import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = (): JSX.Element => {
  return (
    <div className='py-20 h-screen bg-gray-100 px-4 sm:px-6 lg:px-8'>
      <div className='row-auto text-center w-full'>
        <p className='text-2xl sm:text-3xl lg:text-5xl py-12 text-gray-600'>GraphQl-Jwt-Auth-Tailwind</p>
      </div>
      <div className='grid lg:grid-cols-6 xl:gap-12 text-center text-xl uppercase tracking-widest flex-col items-center gap-5'>
        <div className='lg:col-start-3 p-3 bg-green-400 hover:bg-green-700 rounded-lg text-lg focus:outline-none shadow-lg transition ease-out duration-500'>
          <Link to='login'>
            <div>Login</div>
          </Link>
        </div>
        <div className='p-3 bg-green-400 hover:bg-green-700 rounded-lg text-lg focus:outline-none shadow-lg transition ease-out duration-500'>
          <Link to='register'>
            <div>Register</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
