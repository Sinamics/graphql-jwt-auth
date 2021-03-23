import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Grid, Header } from 'semantic-ui-react';

const LandingPage = (): JSX.Element => {
  return (
    <Grid padded centered>
      <Grid.Row>
        <Grid.Column width='4'>
          <Divider clearing />
          <Header color='teal' as='h1' content='GraphQl-jwt-auth Boilerplate' textAlign='center' subheader='enjoy!' />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width='2'>
          <Link to='login'>
            <Button color='teal'>Login</Button>
          </Link>
        </Grid.Column>
        <Grid.Column width='2' textAlign='right'>
          <Link to='register'>
            <Button color='teal'>Register</Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width='4' textAlign='right'>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LandingPage;
