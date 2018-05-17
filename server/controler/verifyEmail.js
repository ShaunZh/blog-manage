const express = require('express');
const router = express.Router();
const database = require('../config').database;

/**
 * @description 判断email地址是否已经注册
 * @param
 * @return
 */
router.get('/:emailAddr', (req, res) => {
  try {
    const sql = `SELECT ID FROM WEB_USER WHERE EMAIL = '${req.params.emailAddr}';`;
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      res.send(JSON.stringify({
        data: {
          items: results,
        },
        status: 200,
        msg: '邮箱尚未被注册',
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
    }));
  }
});

module.exports = router;
