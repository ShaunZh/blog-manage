const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controler');
const config = require('./config');

const app = express();

config.database.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
routes(app);

app.listen(3001, () => {
  console.log('Example app listening on port 3000!');
});

