const isDev = process.env.NODE_ENV !== 'production';

module.exports = JSON.stringify({
  apiUrl: 'http://localhost:4000',
  wsUrl: isDev ? 'ws://localhost:4000' : 'wss://localhost:4000',
  superUser: 'superuser',
  roles: [
    {
      value: 'superuser',
      label: 'Superuser',
    },
    {
      value: 'user',
      label: 'User',
    },
  ],
});
