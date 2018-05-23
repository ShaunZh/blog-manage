const express = require('express');
const _ = require('../utils/lodash');
const database = require('../config').database;
const tokenSecret = require('../config').tokenSecret;
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (_.isEmpty(username)) {
      throw new Error('缺少用户名');
    }
    if (_.isEmpty(password)) {
      throw new Error('缺少密码');
    }
    const sql = `SELECT ID, USERNAME, PASSWORD FROM WEB_USER WHERE USERNAME = '${username}';`;
    // 1. 查找出该用户
    database.query(sql, (error, results, fields) => {
      try {
        if (error) {
          throw new Error(error.message);
        }
        if (results.length === 0) {
          throw new Error('没有找到该用户');
        }
        if (password !== results[0].PASSWORD) {
          throw new Error('密码错误');
        }
        // 生成token
        const token = jwt.sign({
            iss: results[0].ID,
            exp: Math.floor(Date.now() + (30 * 24 * 60 * 60 * 1000)),
          },
          tokenSecret);
        const updateSql = `UPDATE WEB_USER SET ACCESS_TOKEN = ? WHERE USERNAME = '${username}';`;
        const updateParam = [token];
        // 更新token到数据库中
        database.query(updateSql, updateParam, (error2, results2, fields2) => {
          // 更新出现错误
          if (error2) {
            res.send(JSON.stringify({
              status: 400,
              msg: error2.message,
            }));
          }
          // 更新成功
          res.send(JSON.stringify({
            status: 200,
            data: {
              accessToken: token,
            },
            msg: '获取token成功',
          }));
        });
      } catch (e) {
        res.send(JSON.stringify({
          status: 400,
          msg: e.message,
        }));
      }
    });
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
    }));
  }
});

module.exports = router;
