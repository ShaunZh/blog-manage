const express = require('express');
const jwt = require('jsonwebtoken');
const tokenSecret = require('../config/').tokenSecret;

/**
 * @description 进行token处理中间件
 * @param
 * @return
 */

const jwtauth = (req, res, next) => {
  // 1. 获取token
  const token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) || (req.headers['x-access-token']);
  // 2. 如果获取的是与用户相关的信息，则需要token
  if (req.url.indexOf('/author/notes') === 0 || req.url.indexOf('/author/notebooks') === 0) {
    if (token) {
      try {
        // 解析token
        const tokenDecode = jwt.verify(token, tokenSecret);
        if (tokenDecode.exp <= new Date().getTime()) {
          // token已过期
          res.send(JSON.stringify({
            status: 400,
            msg: 'token已过期',
          }));
        } else {
          // token有效
          req.userInfo = {
            userId: tokenDecode.iss,
          };
          next();
        }
      } catch (e) {
        // 解析token失败
        res.send(JSON.stringify({
          status: 400,
          msg: '解析token失败',
        }));
      }
    } else {
      // 无法获取token
      res.send(JSON.stringify({
        status: 406,
        msg: 'token为空，请重新获取token',
      }));
    }
  } else {
    next();
  }
};

module.exports = jwtauth;
