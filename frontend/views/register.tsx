import React, { useState } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { useRegisterMutation } from '../graphql/generated/dist';

interface StateProps {
  username: string;
  password: string;
}
const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useState<StateProps>({
    username: '',
    password: '',
  });

  const [register, { error: registerError, loading: registerLoading }] = useRegisterMutation({ errorPolicy: 'all' });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    register({ variables: { registerData: { ...user } } })
      .then(({ errors }) => {
        if (errors?.length) return;
        history.push('login');
      })
      .catch((err) => console.error(err));
  };
  if (registerLoading) return <div>Loading...</div>;
  return (
    <div>
      <h3 className='text-center text-white pt-5'>Register form</h3>
      <div className='container'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-6'>
            <div className='col-md-12'>
              <form className='form' onSubmit={handleSubmit}>
                <h3 className='text-center text-info'>Register</h3>
                <div className='text-danger d-flex justify-content-center'>{registerError?.message}</div>
                <div className='form-group'>
                  <label htmlFor='username' className='text-info'>
                    Username:
                  </label>
                  <br />
                  <input tabIndex={1} onChange={handleChange} type='username' name='username' className='form-control' />
                </div>
                <div className='form-group'>
                  <label htmlFor='password' className='text-info'>
                    Password:
                  </label>
                  <br />
                  <input tabIndex={2} onChange={handleChange} type='password' name='password' className='form-control' />
                </div>
                <div className='form-group'>
                  <br />
                  <button tabIndex={3} type='submit' className='btn btn-info btn-md'>
                    Register
                  </button>
                </div>
                <div className='text-right'>
                  <Link to='login'>Login here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
