module.exports = function (app) {
  app.use('/tags', require('./tags.js'));
  app.use('/users', require('./users.js'));
  app.use('/articles', require('./articles.js'));
  app.use('/login', require('./login.js'));
  app.use('/activeAccount', require('./activeAccount.js'));
  app.use('/getAccessToken', require('./getAccessToken.js'));
};
