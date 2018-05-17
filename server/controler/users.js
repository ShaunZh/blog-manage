const express = require('express');
const _ = require('../utils/underscroe');
const database = require('../config/').database;
const email = require('../utils/email');
const utils = require('../utils/functions');

const router = express.Router();

/**
 * @description 发送激活链接
 * @param {username}string: 用户名
 *        {emailAddr}string: 接受激活链接的邮箱地址
 *        {callback}function: 发送完激活邮件后执行的回调函数
 * @return
 */
const sendActiveEmail = (username, emailAddr, checkCode, callback) => {

  // 创建一个邮件对象
  const emailInfo = {
    // 发件人
    from: '懒窝创意<lazyhome804@126.com>',
    // 主题
    subject: '懒窝创意的注册验证码',
    // 收件人
    to: '308826842@qq.com',
    // 邮件内容，HTML格式
    // 接收激活请求的链接
    // html: `<p>点击激活：<a href="http://localhost:3000/checkCode?username=${username}&checkCode=${checkCode}"></a></p>`,
    html: `<a href="http://localhost:3000/activeAccount?username=${username}&checkCode=${checkCode}">点击激活</a>`,
  };
  email(emailInfo, () => {
    callback();
  });
};
/**
 * @description 检查email是否已经被注册了
 * @param {email}string —— email地址
 * @return true: email没有被注册，false：email已经被注册
 */
const checkEmail = (emailAddr) => {
  try {
    const sql = `SELECT ID FROM WEB_USER WHERE EMAIL = '${emailAddr}';`;
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      if (results.length) {
        return {
          status: 201,
          msg: '邮箱已经被注册',
        };
      }
      return {
        status: 200,
        msg: '邮箱尚未被注册',
      };
    });
  } catch (e) {
    return {
      status: 400,
      msg: e.message,
    };
  }
};

/**
 * @description 检查用户名是否已经被注册了
 * @param
 * @return
 */
const checkUsername = (username) => {
  try {
    const sql = `SELECT ID FROM WEB_USER WHERE USERNAME = '${username}';`;
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      if (results.length) {
        return {
          status: 201,
          msg: '用户名已经被注册',
        };
      }
      return {
        status: 200,
        msg: '用户名没有被注册',
      };
    });
  } catch (e) {
    return {
      status: 400,
      msg: e.message,
    };
  }
};

/**
 * @description 获取用户列表
 * @param
 * @return
 */
router.get('/', (req, res) => {
  try {
    let offset = 0;
    let limit = 10;
    let sql = 'SELECT ID, USERNAME, NICKNAME, MOBILE, HEAD_IMG FROM WEB_USER ';
    if (_.isObject(req.params) && !_.isEmpty(req.params)) {
      if (!_.isUndefined(req.params.userId) && req.params.userId !== '') {
        sql += `WHERE ID = ${req.params.userId} `;
      }
      if (!_.isUndefined(req.params.offset) && req.params.offset !== '') {
        offset = req.params.offset;
      }
      if (!_.isUndefined(req.params.limit) && req.params.limit !== '') {
        limit = req.params.limit;
      }
    }
    sql += `ORDER BY CREATE_TIME LIMIT ${offset}, ${limit};`;
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      res.send(JSON.stringify({
        status: 200,
        msg: '成功',
        data: results,
      }));
    });
  } catch (error) {
    res.send(JSON.stringify({
      status: 400,
      msg: error.message,
      data: '',
    }));
  }
});

/**
 * @description 获取指定用户
 * @param
 * @return
 */
router.get('/:id', (req, res) => {
  try {
    if (!_.isString(req.params.id)) {
      throw new Error('用户名不能为空');
    }
    const sql = `SELECT ID FROM WEB_USER WHERE USERNAME = '${req.params.id}'`;
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      const items = (JSON.parse(JSON.stringify(results))).map((item) => {
        return {
          id: item.ID,
          username: item.USERNAME,
          mobile: item.MOBILE,
          nickname: item.NICKNAME,
          email: item.EMAIL,
        };
      });
      res.send(JSON.stringify({
        status: 200,
        msg: '成功',
        data: {
          items,
        },
      }));
    });
  } catch (error) {
    res.send(JSON.stringify({
      status: 400,
      msg: error.message,
      data: null,
    }));
  }
});

/**
 * @description 注册用户
 * @param
 * @return
 */
router.post('/', (req, res) => {
  try {
    const username = req.body.username; // 用户名
    const password = req.body.password; // 密码
    const confirmPassword = req.body.confirmPassword; // 确认密码
    const emailAddr = req.body.email; // 邮箱
    const mobile = req.body.mobile; // 手机号码
    const createTime = req.body.createTime; // 创造时间
    if (_.isEmpty(username)) {
      throw new Error('请输入用户名');
    }
    if (_.isEmpty(password)) {
      throw new Error('请输入密码');
    }
    if (_.isEmpty(confirmPassword)) {
      throw new Error('请确认密码');
    }
    // 两次输入的密码不同
    if (password !== confirmPassword) {
      throw new Error('两次输入的密码不同');
    }
    if (_.isEmpty(emailAddr)) {
      throw new Error('请输入邮箱地址');
    }
    let data = {};

    const checkUsernameSql = `SELECT ID FROM WEB_USER WHERE USERNAME = '${username}';`;
    const checkEmailSql = `SELECT ID FROM WEB_USER WHERE EMAIL = '${emailAddr}';`;

    // 查找用户名是否已被注册
    database.query(checkUsernameSql, (error, results, fields) => {
      if (error) {
        throw new Error(error.message);
      }
      if (results.length) {
        Object.assign(data, { usernameValid: false });
      }
      // 查找邮箱是否已被注册
      database.query(checkEmailSql, (error2, results2, fields2) => {
        if (error2) {
          throw new Error(error2.message);
        }
        if (results2.length) {
          Object.assign(data, { emailValid: false });
        }
        // 如果校验username和email都没有注册，则发送激活邮件
        if (Object.keys(data).length === 0) {
          // 产生随机的6位校验码
          const checkCode = Math.floor(Math.random() * 1000000);
          const newDate = new Date();
          // 在此处插入一条用户信息
          const userData = {
            ID: utils.getUuid(),
            USERNAME: username,
            PASSWORD: password,
            EMAIL: emailAddr,
            CREATE_TIME: createTime,
            IS_ACTIVE: false,
            MOBILE: mobile,
            CHECK_CODE: checkCode, // 校验码
            ACTIVE_DEADLINE: (newDate.setMinutes(newDate.getMinutes() + 30)).toString(), // 设置激活链接过期时间
          };
          // 插入用户数据
          database.query('INSERT INTO WEB_USER SET ?', userData, (error3, results3, fields3) => {
            if (error3) {
              console.log(error3.message);
              throw new Error(error3.message);
            }
            // 发送激活信息
            sendActiveEmail(username, emailAddr, checkCode, () => {
              res.send(JSON.stringify({
                status: 200,
                msg: '注册成功',
              }));
            });
          });
        } else {
          // 如果username或email已注册，则返回响应的信息
          res.send(JSON.stringify({
            status: 201,
            data,
          }));
        }
      });
    });
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
      data: null,
    }));
  }
});

module.exports = router;
