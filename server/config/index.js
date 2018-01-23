const mysql = require('mysql');

const config = {};

config.databaseConfig = {
  host: 'localhost',
  user: 'root',
  password: 'hexon804',
  database: 'myweb',
};

config.database = mysql.createConnection(config.databaseConfig);

module.exports = config;
