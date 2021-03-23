import React, { useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../utils/accessToken';
import { useLoginMutation } from '../graphql/generated/dist';

interface StateProps {
  username: string;
  password: string;
}

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useState<StateProps>({ username: '', password: '' });

  const [login, { error: loginError, loading: loginLoading }] = useLoginMutation({ errorPolicy: 'all' });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await login({
      variables: { loginData: { ...user } },
    })
      .then(({ errors, data }) => {
        if (errors) return;

        if (data && data.login) {
          setAccessToken(data.login.accessToken).then(() => {
            history.push('/privateroute');
          });
        }
      })
      .catch((err) => console.error(err));
  };

  if (loginLoading) return <div>Loading...</div>;
  return (
    <div>
      <h3 className='text-center text-white pt-5'>Login form</h3>
      <div className='container'>
        <div id='login-row' className='row justify-content-center align-items-center'>
          <div id='login-column' className='col-md-6'>
            <div id='login-box' className='col-md-12'>
              <form className='form' onSubmit={handleSubmit}>
                <h3 className='text-center text-info'>Login</h3>
                <div className='text-danger d-flex justify-content-center'>{loginError?.message}</div>
                <div className='form-group'>
                  <label htmlFor='username' className='text-info'>
                    Username:
                  </label>
                  <br />
                  <input tabIndex={1} onChange={handleChange} type='text' name='username' className='form-control' />
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
                  <button type='submit' tabIndex={3} className='btn btn-info btn-md'>
                    Login
                  </button>
                </div>
                <div id='register-link' className='text-right'>
                  <Link to='register'>Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
