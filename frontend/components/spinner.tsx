import React from 'react';

const Spinner = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <svg className='animate-spin h-5 w-5 mr-3 ...' viewBox='0 0 24 24'></svg>
      Processing
    </div>
  );
};

export default Spinner;
