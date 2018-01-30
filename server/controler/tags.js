const express = require('express');

const utils = require('../utils/functions');
const _ = require('../utils/underscroe');

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
    let items = JSON.parse(JSON.stringify(results));
    items = items.map((item) => {
      const obj = {};
      obj.id = item.ID;
      obj.name = item.NAME;
      obj.createTime = item.CREATE_TIME;
      obj.modifyTime = item.MODIFY_TIME;
      return obj;
    });
    res.send(JSON.stringify({
      status: 200,
      msg: '成功',
      data: {
        items,
      },
    }));
  });
});

/**
 * @description 添加tag
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
    const id = utils.getUuid();
    const sql = 'INSERT INTO WEB_TAG SET ?';
    const params = { ID: id, CREATE_TIME: data.createTime, NAME: data.name };
    database.query(sql, params, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      res.send(JSON.stringify({
        status: 200,
        data: {
          id,
          createTime: data.createTime,
          name: data.name,
        },
        msg: '添加成功',
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
      data: null,
    }));
  }
});

/**
 * @description 更新tag
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
    if (_.isEmpty(data.name)) {
      throw new Error('标签名称不能为空');
    }
    if (_.isEmpty(data.modifyTime)) {
      throw new Error('没有修改时间');
    }
    const sql = 'UPDATE WEB_TAG SET NAME = ?, MODIFY_TIME = ? WHERE ID = ?';
    const params = [data.name, data.modifyTime, data.id];
    database.query(sql, params, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      res.send(JSON.stringify({
        status: 200,
        data: null,
        msg: '更新成功',
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
      data: null,
    }));
  }
});


/**
 * @description 删除tag
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
      throw new Error('标签id不能为空');
    }
    const sql = `DELETE FROM WEB_TAG WHERE ID = "${data.id}"`;
    database.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      res.send(JSON.stringify({
        status: 200,
        data: null,
        msg: '删除成功',
      }));
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
