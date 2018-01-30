const express = require('express');
const _ = require('../utils/underscroe');
const database = require('../config/').database;

const router = express.Router();

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


module.exports = router;
