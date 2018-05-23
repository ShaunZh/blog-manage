module.exports = function (app) {
  // 账户相关
  app.use('/users', require('./users.js'));
  app.use('/login', require('./login.js'));
  app.use('/activeAccount', require('./activeAccount.js')); // 激活账号接口
  app.use('/getAccessToken', require('./getAccessToken.js')); // 获取访问token接口
  app.use('/verifyEmail', require('./verifyEmail.js')); // 校验邮箱是否已注册
  app.use('/sendActiveEmail', require('./sendActiveEmail.js')); // 发送激活链接到邮箱

  // app.use('/tags', require('./tags.js'));
  // app.use('/articles', require('./articles.js'));

  // 笔记本
  app.use('/author/notebooks', require('./notebooks.js'));
  // 笔记
  app.use('/author/notes', require('./notes.js'));
};
