const express = require('express');
const router = express.Router();
const utils = require('../utils/functions');
const database = require('../config/').database;

const _ = require('../utils/lodash');
const userId = 'e6a92aa0-5b69-11e8-9b6c-e35b8d59cc9e';

/**
 * @description 获取NOTEBOOK
 * @param
 * @return
 */
router.get('/notebooks', (req, res) => {
  try {
    database.query(`SELECT ID, NAME, CREATE_TIME, MODIFY_TIME FROM WEB_NOTEBOOK WHERE USER_ID = '${userId}' ORDER BY CREATE_TIME`, (error, results, fields) => {
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
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
    }));
  }
});

/**
 * @description 获取指定NOTEBOOK中的notes
 * @param
 * @return
 */
router.get('/notebooks/:id/notes', (req, res) => {
  try {
    const notebookId = req.params.id;
    if (_.isUndefined(req.query.limit)) {
      throw new Error('缺少参数: 请填写每页的文章数');
    }
    if (_.isUndefined(req.query.offset)) {
      throw new Error('缺少参数: 请填写获取文章的偏移位置');
    }
    const limit = Number(req.query.limit); // limit 是前端传来的每页的记录数
    const offset = Number(req.query.offset - 1) * limit; // offset 是前端传来的页码
    const getTotalCount = `SELECT COUNT(*) AS totalCount FROM WEB_NOTE WHERE NOTEBOOK_ID = '${notebookId}' AND IS_PUBLISH = true LIMIT 1`;
    const notesSql = `SELECT ID AS id, MODIFY_TIME AS modifyTime, TITLE AS title, ABSTRACT AS abstract FROM WEB_NOTE WHERE NOTEBOOK_ID = '${notebookId}' AND IS_PUBLISH = true ORDER BY MODIFY_TIME DESC LIMIT ${limit} offset ${offset} ;`;
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      // 获取总数
      database.query(getTotalCount, (error1, results1) => {
        if (error1) {
          return database.rollback(() => {
            throw error1;
          });
        }
        const totalCount = JSON.parse(JSON.stringify(results1))[0].totalCount;
        // 获取文章列表
        database.query(notesSql, (error, results) => {
          if (error) {
            return database.rollback(() => {
              throw error;
            });
          }
          const items = results.map((item) => {
            return {
              id: item.id,
              modifyTime: item.modifyTime,
              title: item.title,
              abstract: item.abstract,
            };
          });
          database.commit((err1) => {
            if (err1) {
              return database.rollback(() => {
                throw err1;
              });
            }
            res.send(JSON.stringify({
              status: 200,
              msg: '获取文章列表成功',
              data: {
                items,
                pageSize: limit, // 一页所包含的文章数
                totalCount, // 文章的总页数
                totalPage: totalCount > 0 ? ((_.parseInt(totalCount / limit)) + ((totalCount % limit) ? 1 : 0)) : 0,
                curPage: offset + 1, // 当前页数
              },
            }));
          });
        });
      });
    });
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
    }));
  }
});

/**
 * @description 获取文章详情
 * @param
 * @return
 */
router.get('/notes/:id/content', (req, res) => {
  try {
    if (_.isUndefined(req.params.id)) {
      throw new Error('参数错误：请填写文章id');
    }
    const noteSql = `SELECT ID AS id, MODIFY_TIME, TITLE AS title, ABSTRACT AS abstract, CONTENT AS content FROM WEB_NOTE WHERE ID = '${req.params.id}';`;
    database.query(noteSql, (error, results) => {
      if (error) {
        throw new Error(error.message);
      }
      res.send(JSON.stringify({
        status: 200,
        msg: '获取文章成功',
        data: {
          id: results[0].id,
          modifyTime: results[0].modifyTime,
          title: results[0].title,
          abstract: results[0].abstract,
          content: results[0].content,
        },
      }));
    });
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
    }));
  }
});

module.exports = router;
