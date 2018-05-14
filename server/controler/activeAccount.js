const express = require('express');
const _ = require('../utils/underscroe');
const database = require('../config/').database;

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const username = req.query.username;
    const checkCode = req.query.checkCode;

    if (_.isEmpty(username) || _.isEmpty(checkCode)) {
      throw new Error('注册链接失效');
    } else {
      const sql = `SELECT ID, USERNAME, CHECK_CODE, IS_ACTIVE, ACTIVE_DEADLINE FROM WEB_USER WHERE USERNAME = '${username}';`;
      database.query(sql, (error, results, fields) => {
        if (error) {
          throw new Error(error);
        }
        const now = (new Date().getTime());
        if (results.length === 0) {
          res.send(JSON.stringify({
            status: 201,
            msg: '账户未找到，请注册',
          }));
        } else if (now > (parseInt(results[0].ACTIVE_DEADLINE))) {
          // 链接已失效
          res.send(JSON.stringify({
            status: 202,
            msg: '链接已失效',
          }));
        } else if (results[0].IS_ACTIVE) {
          res.send(JSON.stringify({
            status: 203,
            msg: '账户已激活，请勿重复激活',
          }));
        } else if (checkCode === results[0].CHECK_CODE) {
          const updateSql = `UPDATE WEB_USER SET ACTIVE_TIME = ?, IS_ACTIVE = ? WHERE USERNAME = '${username}';`;
          const updateParams = [new Date(), true];
          database.query(updateSql, updateParams, (error1, results1, fields1) => {
            if (error1) {
              throw new Error(error1);
            }
            res.send(JSON.stringify({
              status: 200,
              msg: '用户已激活',
            }));
          });
        }
      });
    }
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
    }));
  }
});

module.exports = router;
