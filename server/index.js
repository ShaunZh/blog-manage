const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controler');
const config = require('./config');

const app = express();

config.database.connect();

app.use(bodyParser.json({ limit: '1mb' })); // body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ // 此项必须在 bodyParser.json 下面,为参数编码
  extended: true,
}));

routes(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

