import React from 'react';
import { useMeQuery, useSuperUserRoleDataQuery, useToggleSuperuserMutation, useUserRoleDataQuery } from 'frontend/graphql/generated/dist';
import { setAccessToken } from '../utils/accessToken';
import { RouteComponentProps } from 'react-router';
import { Button, Divider, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { apiUrl } from 'config';

const PrivatePage: React.FC<RouteComponentProps> = ({ history }) => {
  const { data: userdata, error: usererror, loading: userDataLoading } = useUserRoleDataQuery();
  const { data: superUserData, error: superUserError, loading: superuserDataLoading } = useSuperUserRoleDataQuery();

  const [toggleSuperUser] = useToggleSuperuserMutation();

  const { error, data: { me } = { me: Object } }: any = useMeQuery();

  const LogOut = async () => {
    setAccessToken('');
    await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => history.push('login'));
  };

  if (error) return <div className='text-danger d-flex justify-content-center'>{error.message}</div>;
  if (userDataLoading || superuserDataLoading)
    return (
      <Grid style={{ paddingTop: 50 }} padded columns={4} centered>
        Loading..
      </Grid>
    );
  return (
    <Grid padded columns={16} centered>
      <Divider clearing hidden />
      <Grid.Row columns={4}>
        <Grid.Column textAlign='left'>
          <Button
            color='teal'
            onClick={() =>
              toggleSuperUser({ variables: { user: { id: me?.data?.id } } })
                // TODO just for testing purpose.. :)
                .then(() => window.location.reload())
                .catch((err) => console.log(err))
            }
          >
            Toggle Role Permission
          </Button>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button color='orange' onClick={() => LogOut()}>
            LogOut
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4} divided stretched>
        <Grid.Column>
          <Segment>
            <h3>Hey {me?.data?.username}</h3>
            <pre>{JSON.stringify(me, null, 2)}</pre>
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment>
            <Header content='Admin Data' />
            <Message info hidden={!superUserData} header={superUserData?.superUserRoleData?.message} />
            <Message error hidden={!superUserError} header={superUserError?.message} />
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment>
            <Header content='User Data' />
            <Message info hidden={!userdata} header={userdata?.userRoleData?.message} />
            <Message error hidden={!usererror} header={usererror?.message} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PrivatePage;
