module.exports = function (app) {
  app.use('/tags', require('./tags.js'));
  app.use('/users', require('./users.js'));
  app.use('/articles', require('./articles.js'));
  app.use('/login', require('./login.js'));
  app.use('/activeAccount', require('./activeAccount.js')); // 激活账号接口
  app.use('/getAccessToken', require('./getAccessToken.js')); // 获取访问token接口
};
