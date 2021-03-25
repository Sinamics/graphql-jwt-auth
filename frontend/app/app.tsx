import React, { useEffect, useState } from 'react';
import Routes from './routes';

// AUTH
import { setAccessToken } from 'frontend/utils/accessToken';

// Config
import config from 'config';

const App: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${config.apiUrl}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (x) => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div></div>;

  return <Routes />;
};

export default App;
