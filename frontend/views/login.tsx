import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { setAccessToken } from '../utils/accessToken';
import { useLoginMutation } from '../graphql/generated/dist';

interface LoginProps {
  history: any;
  match: any;
}

const LoginPage: React.FC<RouteComponentProps> = ({ history, match }: LoginProps) => {
  const [user, setUser] = useState({ username: '', password: '' });

  const [submitted, setSubmitted] = useState(false);
  // const [login] = useMutation(LOGIN);
  const [login, { error: loginError, loading: loginLoading }] = useLoginMutation({ errorPolicy: 'all' });

  // if (data && data.login) setAccessToken(data.login.accessToken);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSubmitted(true);
    // if (user.username && user.password) {
    await login({
      variables: { loginData: { ...user } },
      // Fetch user and cache data
      // update: (store, { data }) => {
      //   if (!data || !data.login) {
      //     return null;
      //   }

      //   store.writeQuery<MeQuery>({
      //     query: MeDocument,
      //     data: {
      //       me: data.login.user,
      //     },
      //   });
      // },
    })
      .then(({ errors, data }) => {
        if (errors) return;

        if (data && data.login) {
          setAccessToken(data.login.accessToken).then(() => {
            history.push('/privateroute');
          });
        }
      })
      .catch((err) => console.log(err));
    // }
  };

  return (
    <div>
      <h3 className='text-center text-white pt-5'>Login form</h3>
      <div className='container'>
        <div id='login-row' className='row justify-content-center align-items-center'>
          <div id='login-column' className='col-md-6'>
            <div id='login-box' className='col-md-12'>
              <h3 className='text-center text-info'>Login</h3>
              <div className='text-danger d-flex justify-content-center'>{loginError?.message}</div>
              <div className='form-group'>
                <label htmlFor='username' className='text-info'>
                  Username:
                </label>
                <br />
                <input onChange={handleChange} type='text' name='username' className='form-control' />
              </div>
              <div className='form-group'>
                <label htmlFor='password' className='text-info'>
                  Password:
                </label>
                <br />
                <input onChange={handleChange} type='password' name='password' className='form-control' />
              </div>
              <div className='form-group'>
                <br />
                <button onClick={handleSubmit} className='btn btn-info btn-md'>
                  Login
                </button>
              </div>
              <div id='register-link' className='text-right'>
                <Link to='register'>Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
