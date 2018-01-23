const express = require('express');
// 引入数据库
const database = require('../config').connection;

const router = express.Router();

router.get('/', (req, res) => {
  res.send('get articles');
});

module.exports = router;
