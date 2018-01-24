const express = require('express');

const utils = require('../utils/functions');
const _ = require('../utils/underscroe');

const router = express.Router();
const database = require('../config').database; // 引入数据库

/**
 * @description 获取文章列表
 * @param
 * @return
 */
router.get('/', (req, res) => {
  try {
    const data = req.query;
    let limit = 5;
    let offset = 0;
    let sql = `SELECT ID, TITLE, AUTHOR, ABSTRACT, CREATE_TIME, TAG_ID FROM WEB_ARTICLE `;
    // 判断传入的参数
    if (_.isObject(data)) {
      // 是否返回指定tag的文章列表
      if (!_.isUndefined(data.tagId) && data.tagId !== '') {
        sql += `WHERE TAG_ID = ${data.tagId} `;
      }
      if (!_.isUndefined(data.offset) && _.isNumber(data.offset)) {
        offset = data.offset;
      }
      if (!_.isUndefined(data.limit) && _.isNumber(data.limit)) {
        limit = data.limit;
      }
    }
    sql += `ORDER BY CREATE_TIME LIMIT ${offset}, ${limit};`;
    database.query(sql, (error, results) => {
      if (error) {
        throw new Error(error);
      }
      const items = JSON.parse(JSON.stringify(results));
      res.send(JSON.stringify({
        code: 200,
        msg: '成功',
        data: {
          items,
        },
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      code: 400,
      msg: e.message,
      data: null,
    }));
  }
});

/**
 * @description 获取文章详情
 * @param
 * @return
 */
router.get('/:id', (req, res) => {
  try {
    if (!_.isString(req.params.id)) {
      throw new Error('id必须是字符串');
    }
    if (req.params.id === '') {
      throw new Error('id不能为空字符串');
    }
    const sql = `SELECT ID, TITLE, AUTHOR, CREATE_TIME, CONTENT FROM WEB_ARTICLE WHERE ID = "${req.params.id}";`;
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      const items = JSON.parse(JSON.stringify(results));
      res.send(JSON.stringify({
        code: 200,
        msg: '成功',
        data: {
          items,
        },
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      code: 400,
      msg: e.message,
      data: null,
    }));
  }
});
/**
 * @description 添加文章
 * @param
 * @return
 */
router.post('/', (req, res) => {
  try {
    const data = req.body;
    if (!_.isObject(data)) {
      throw new Error('参数必须是一个对象');
    }
    if (_.isNull(data)) {
      throw new Error('参数不能为null');
    }
    const sql = 'INSERT INTO WEB_ARTICLE SET ?';
    const params = {
      ID: utils.getUuid(), // id
      TAG_ID: data.tagId, // tag id
      CREATE_TIME: data.createTime, // 创建时间
      AUTHOR: data.author, // 作者
      TITLE: data.title, // 标题
      CONTENT: data.content, // 正文
      ABSTRACT: data.abstract, // 介绍
    };
    database.query(sql, params, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      res.send(JSON.stringify({
        code: 200,
        data: {
          id: params.ID,
          title: params.TITLE,
        },
        msg: '添加成功',
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      code: 400,
      msg: e.message,
      data: null,
    }));
  }
});
/**
 * @description 更新文章
 * @param
 * @return
 */
router.put('/', (req, res) => {
  try {
    const data = req.body;
    if (!_.isObject(data)) {
      throw new Error('参数必须是一个对象');
    }
    if (_.isNull(data)) {
      throw new Error('参数不能为null');
    }
    if (_.isEmpty(data.modifyTime)) {
      throw new Error('没有修改时间');
    }
    let sql = 'UPDATE WEB_ARTICLE SET ';
    let params = [];
    if (!_.isUndefined(data.title) && data.title !== '') {
      sql += 'TITLE = ?, ';
      params.push(data.title);
    }
    if (!_.isUndefined(data.author) && data.author !== '') {
      sql += 'AUTHOR = ?, ';
      params.push(data.author);
    }
    if (!_.isUndefined(data.modifyTime) && data.modifyTime !== '') {
      sql += 'MODIFY_TIME = ?, ';
      params.push(data.modfiyTime);
    }
    if (!_.isUndefined(data.tagId) && data.tagId !== '') {
      sql += 'TAG_ID = ?, ';
      params.push(data.tagId);
    }
    if (!_.isUndefined(data.abstract) && data.abstract !== '') {
      sql += 'ABSTRACT = ?, ';
      params.push(data.abstract);
    }
    if (!_.isUndefined(data.content) && data.content !== '') {
      sql += 'CONTENT = ?, ';
      params.push(data.content);
    }
    if (params.length === 0) {
      throw new Error('没有传递需要修改的数据');
    }
    sql = sql.substring(0, sql.length - 2);
    sql += ` WHERE ID = "${data.id}"`;
    database.query(sql, params, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      res.send(JSON.stringify({
        code: 200,
        data: {
          id: data.id,
        },
        msg: '更新成功',
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      code: 400,
      msg: e.message,
      data: null,
    }));
  }
});
/**
 * @description 删除指定文章
 * @param
 * @return
 */
router.delete('/', (req, res) => {
  try {
    const data = req.body;
    if (!_.isObject(data)) {
      throw new Error('参数必须是一个对象');
    }
    if (_.isNull(data)) {
      throw new Error('参数不能为null');
    }
    if (_.isEmpty(data.id)) {
      throw new Error('id不能为空');
    }
    const sql = `DELETE FROM WEB_ARTICLE WHERE ID = "${data.id}"`;
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      res.send(JSON.stringify({
        code: 200,
        data: null,
        msg: '删除成功',
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      code: 400,
      msg: e.message,
      data: null,
    }));
  }
});
module.exports = router;
