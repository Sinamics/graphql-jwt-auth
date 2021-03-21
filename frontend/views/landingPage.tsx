import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <div className='d-flex justify-content-center'>
        <h2>Mongo, GraphQl, Jwt Boilerplate</h2>
      </div>
      <div className='d-flex justify-content-center'>
        <Link to='login'>
          <button className='btn btn-primary'>Login</button>
        </Link>
        <Link to='register'>
          <button className='btn btn-secondary ml-5'>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
