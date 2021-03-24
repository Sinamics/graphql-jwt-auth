import { toErrorMap } from 'frontend/utils/errorMap';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Divider, Form, Grid, Header, Label, Message } from 'semantic-ui-react';
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

  const [userSignUp, { error: registerError, loading: registerLoading, data }] = useRegisterMutation({ errorPolicy: 'all' });

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

  return (
    <Grid padded centered columns={3}>
      <Divider clearing hidden />
      <Grid.Row>
        <Grid.Column>
          <Message error warning compact hidden={!registerError}>
            <Message.Header>{registerError?.message}</Message.Header>
          </Message>
          <Header color='teal' as='h1' content='Register' subheader='successfull registration will push you to login page' />
          <Divider clearing />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Input label='Username' onChange={handleChange} name='username' type='text' placeholder='Username' />

            <Form.Field>
              <label>Password</label>
              <input onChange={handleChange} name='password' type='password' placeholder='Password' />
            </Form.Field>
            <Button disabled={registerLoading} type='submit'>
              Submit
            </Button>
            <Link to='login'>
              <Label color='teal' ribbon='right' className='text-right'>
                Login
              </Label>
            </Link>
          </Form>
          <Message error warning hidden={!data?.register.errors} list={toErrorMap(data?.register.errors || [])} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SignUp;
