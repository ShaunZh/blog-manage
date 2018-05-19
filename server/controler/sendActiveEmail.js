const express = require('express');
const email = require('../utils/email');
const database = require('../config').database;
const _ = require('../utils/underscroe');

const router = express.Router();
/**
 * @description 发送激活链接
 * @param {username}string: 用户名
 *        {emailAddr}string: 接受激活链接的邮箱地址
 *        {callback}function: 发送完激活邮件后执行的回调函数
 * @return
 */
router.post('/', (req, res) => {
  try {
    if (_.isEmpty(req.body.username)) {
      throw new Error('用户名不能为空');
    }
    const username = req.body.username;
    const sql = `SELECT ID, USERNAME, PASSWORD, IS_ACTIVE FROM WEB_USER WHERE USERNAME = '${username}';`;
    // 获取用户信息
    database.query(sql, (error, results, fields) => {
      if (error) {
        res.send(JSON.stringify({
          status: 400,
          msg: error.message,
        }));
      }
      const checkCode = Math.floor(Math.random() * 1000000);
      // 创建一个邮件对象
      const emailInfo = {
        // 发件人
        from: '懒窝创意<lazyhome804@126.com>',
        // 主题
        subject: '懒窝创意的激活链接',
        // 收件人
        to: '308826842@qq.com',
        // 邮件内容，HTML格式
        // 接收激活请求的链接
        // html: `<p>点击激活：<a href="http://localhost:3000/checkCode?username=${username}&checkCode=${checkCode}"></a></p>`,
        html: `<a href="http://localhost:3000/activeAccount?username=${username}&checkCode=${checkCode}">点击激活</a>`,
      };
      email(emailInfo, () => {
        try {
          const updateSql = `UPDATE WEB_USER SET CHECK_CODE = ?, ACTIVE_DEADLINE = ? WHERE USERNAME = '${username}';`;
          const newDate = new Date();
          const updateParam = [checkCode, (newDate.setMinutes(newDate.getMinutes() + 30)).toString()];
          database.query(updateSql, updateParam, (error2, results2, fields2) => {
            if (error2) {
              throw new Error(error2.message);
            }
            res.send(JSON.stringify({
              status: 200,
              msg: '发送激活链接成功',
            }));
          });
        } catch (e) {
          res.send(JSON.stringify({
            status: 400,
            msg: e.message,
          }));
        }
      });
    });
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
    }));
  }
});

module.exports = router;
