import React, { useState } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { setAccessToken } from '../utils/accessToken';
import { useLoginMutation } from '../graphql/generated/dist';
import { Button, Divider, Form, Grid, Header, Label, Message } from 'semantic-ui-react';

interface StateProps {
  username: string;
  password: string;
}

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useState<StateProps>({ username: '', password: '' });

  const [login, { error: loginError, loading: loginLoading }] = useLoginMutation({ errorPolicy: 'all' });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
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

  return (
    <Grid padded centered columns={3} onSubmit={handleSubmit}>
      <Divider clearing hidden />
      <Grid.Row>
        <Grid.Column>
          <Message warning compact hidden={!loginError}>
            <Message.Header>{loginError?.message}</Message.Header>
          </Message>
          <Header color='teal' as='h1' content='Login page' subheader='JWT login' />
          <Divider clearing />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Field>
              <label>Username</label>
              <input onChange={handleChange} name='username' type='text' placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input onChange={handleChange} name='password' type='password' placeholder='Password' />
            </Form.Field>
            {/* <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field> */}
            <Button disabled={loginLoading} type='submit'>
              Submit
            </Button>
            <Link to='register'>
              <Label color='teal' ribbon='right' className='text-right'>
                Register
              </Label>
            </Link>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default withRouter(LoginPage);
