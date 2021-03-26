import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = (): JSX.Element => {
  return (
    <div className='py-20 h-screen bg-gray-100 px-4 sm:px-6 lg:px-8'>
      <div className='row-auto text-center w-full'>
        <p className='text-5xl py-5'>GraphQl-Jwt-Auth-Tailwind</p>
      </div>
      <div className='container mx-auto'>
        <div className='flex justify-center'>
          <div className='pr-10'>
            <Link to='login'>
              <button className='p-3 bg-green-400 hover:bg-green-600 rounded-lg text-lg focus:outline-none shadow-lg'>Login</button>
            </Link>
          </div>
          <div className=''>
            <Link to='register'>
              <button className='p-3 bg-green-400 hover:bg-green-600 rounded-lg text-lg focus:outline-none shadow-lg'>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
