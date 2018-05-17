const express = require('express');
const _ = require('../utils/underscroe');
const database = require('../config/').database;
const email = require('../utils/email');

const router = express.Router();

/**
 * @description 注册用户
 * @param
 * @return
 */
router.post('/up', (req, res) => {
  try {
    const username = req.query.username;
    const password = req.qurey.password;
    if (_.isEmpty(username)) {
      throw new Error('请输入用户名');
    }
    if (_.isEmpty(password)) {
      throw new Error('请输入密码');
    }
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
      data: null,
    }));
  }
});

/**
 * @description 获取邮箱验证码
 * @param
 * @return
 */
router.post('/getCode', (req, res) => {
  try {
    const data = req.body;
    if (!_.isObject(data)) {
      throw new Error('参数必须是一个对象');
    }
    if (_.isNull(data)) {
      throw new Error('参数不能为null');
    }
    if (_.isUndefined(data.email) || _.isEmpty(data.email)) {
      throw new Error('请输入email');
    }
    const sql = `SELECT ID FROM WEB_USER WHERE EMAIL = '${data.email}';`;
    // 查找邮箱是否已经被注册
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      // 邮箱已经被注册
      if (results.length) {
        res.send(JSON.stringify({
          status: 201,
          msg: '邮箱已经被注册',
        }));
      } else {
        // 邮箱没有被注册
        // 创建一个邮件对象
        const emailInfo = {
          // 发件人
          from: '懒窝创意<lazyhome804@126.com>',
          // 主题
          subject: '懒窝创意的注册验证码',
          // 收件人
          to: '308826842@qq.com',
          // 邮件内容，HTML格式
          text: '点击激活：1234569', // 接收激活请求的链接
        };
        email(emailInfo, () => {
          res.send(JSON.stringify({
            status: 200,
            msg: '验证码已发送',
          }));
        });
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
