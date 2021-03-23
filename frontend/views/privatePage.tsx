import React from 'react';
import { useMeQuery, useSuperUserRoleDataQuery, useToggleSuperuserMutation, useUserRoleDataQuery } from 'frontend/graphql/generated/dist';
import { setAccessToken } from '../utils/accessToken';
import { RouteComponentProps } from 'react-router';
import { Button, Divider, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { apiUrl } from 'config';
import Spinner from 'frontend/components/spinner';

const PrivatePage: React.FC<RouteComponentProps> = ({ history }) => {
  const { data: userdata, error: usererror, loading: userDataLoading } = useUserRoleDataQuery();
  const { data: superUserData, error: superUserError, loading: superuserDataLoading, refetch } = useSuperUserRoleDataQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const [toggleSuperUser] = useToggleSuperuserMutation();

  const { error: meError, data: { me } = { me: Object } }: any = useMeQuery();

  const LogOut = async () => {
    setAccessToken('');
    await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => history.push('login'));
  };

  return (
    <Grid padded columns={16} centered>
      <Grid.Column>
        {/* If any errors fetching Me Object  */}
        <Message error hidden={!meError} header={meError?.message} />
      </Grid.Column>
      <Divider clearing hidden />
      <Grid.Row columns={4}>
        <Grid.Column textAlign='left'>
          <Button
            color='teal'
            onClick={() =>
              toggleSuperUser({ variables: { user: { id: me?.data?.id } } })
                .then(() => refetch())
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
            {userDataLoading && <Spinner />}
            <Message info hidden={!superUserData} header={superUserData?.superUserRoleData?.message} />
            <Message error hidden={!superUserError} header={superUserError?.message} />
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment>
            <Header content='User Data' />
            {superuserDataLoading && <Spinner />}
            <Message info hidden={!userdata} header={userdata?.userRoleData?.message} />
            <Message error hidden={!usererror} header={usererror?.message} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PrivatePage;
