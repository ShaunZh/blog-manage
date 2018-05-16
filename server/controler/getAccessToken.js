const express = require('express');
const _ = require('../utils/underscroe');
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
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error.message);
      }
      if (results.length) {
        if (password === results[0].PASSWORD) {
          const token = jwt.sign({
            iss: results[0].ID,
            exp: Math.floor(Date.now() + (30 * 24 * 60 * 60 * 1000)) },
            tokenSecret);
          console.log(token);
          const updateSql = `UPDATE WEB_USER SET ACCESS_TOKEN = ? WHERE USERNAME = '${username}';`;
          const updateParam = [token];
          database.query(updateSql, updateParam, (error2, results2, fields2) => {
            if (error2) {
              throw new Error(error2.message);
            }
            res.send(JSON.stringify({
              status: 200,
              data: {
                accessToken: token,
              },
              msg: '获取token成功',
            }));
          });
        } else {
          throw new Error('密码错误');
        }
      } else {
        throw new Error('没有找到该用户');
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
