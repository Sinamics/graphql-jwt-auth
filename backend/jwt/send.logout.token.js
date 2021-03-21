const sendLogoutToken = (res, token) => {
  res.cookie('randomname', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production' ? false : true, //on HTTPS
    // domain: 'example.com', //set your domain
    path: '/refresh_token',
    expires: new Date(Date.now() - 42),
  });
};

module.exports = { sendLogoutToken };
