const express = require('express');

const utils = require('../utils/functions');

const router = express.Router();
const database = require('../config').database; // 引入数据库

/**
 * @description 获取tags
 * @param
 * @return
 */
router.get('/', (req, res) => {
  database.query('SELECT ID, NAME, CREATE_TIME, MODIFY_TIME FROM WEB_TAG ORDER BY CREATE_TIME', (error, results, fields) => {
    if (error) {
      throw new Error(error);
    }
    const items = JSON.parse(JSON.stringify(results));
    res.send(JSON.stringify({
      code: 200,
      msg: '成功',
      items,
    }));
  });
});

/**
 * @description 添加tag
 * @param
 * @return
 */
router.post('/', (req, res) => {
  const data = req.body;
  if ((data instanceof Object) || (data !== null)) {

  }
  const sql = 'INSERT INTO WEB_TAG SET ?';
  const param = { ID: utils.getUuid(), CREATE_TIME: data.createTime, NAME: data.name };
  // sql = database.format(sql, inserts);
  database.query(sql, param, (error, results, fields) => {
    if (error) {
      throw new Error(error);
    }
    res.send(JSON.stringify({
      code: 200,
      items: [],
      msg: '添加成功',
    }));
  });
});

module.exports = router;
