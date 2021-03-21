module.exports = JSON.stringify({
  apiUrl: 'http://localhost:4000',
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
