module.exports = function (app) {
  app.use('/tags', require('./tags.js'));
  app.use('/users', require('./users.js'));
  app.use('/articles', require('./articles.js'));
};
