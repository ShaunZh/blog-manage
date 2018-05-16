const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controler');
const config = require('./config');
const jwtauth = require('./middleware/jwtauth');

const app = express();

config.database.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(jwtauth);

routes(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

