const express = require('express');

const utils = require('../utils/functions');
const _ = require('../utils/lodash');

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
    const articlesList = [];
    let limit = 5;
    let offset = 0;
    let sql = `SELECT ID, IS_PUBLISH, CREATE_TIME FROM WEB_ARTICLE `;
    // 判断传入的参数
    if (_.isObject(data)) {
      // 是否返回指定tag的文章列表
      if (!_.isUndefined(data.tagId) && data.tagId !== '') {
        sql += `WHERE TAG_ID = "${data.tagId}" `;
      }
      if (!_.isUndefined(data.offset) && _.isNumber(data.offset)) {
        offset = data.offset;
      }
      if (!_.isUndefined(data.limit) && _.isNumber(data.limit)) {
        limit = data.limit;
      }
    }
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      sql += `ORDER BY CREATE_TIME DESC LIMIT ${offset}, ${limit};`;
      // 查询ARTICLE表中的文章了列表，该表中包含有已发布的和未发布的所有文章，注意：不包含历史文章
      database.query(sql, (error, results) => {
        if (error) {
          return database.rollback(() => {
            throw error;
          });
        }
        // 获取ARTICLE表中的文章列表，该列表中包含了已发布和未发布的文章列表信息
        const items = (JSON.parse(JSON.stringify(results))).map((item) => {
          return {
            id: item.ID,
            isPublish: item.IS_PUBLISH,
            createTime: item.CREATE_TIME,
          };
        });
        // 获取文章列表，该文章列表包含的是文章最新修改的信息，并不是已发布的文章信息
        items.map((item, index) => {
          const articleSql = `SELECT ARTICLE_ID, CREATE_TIME, TITLE, ABSTRACT, CONTENT FROM WEB_HISTORY_ARTICLE WHERE ARTICLE_ID = '${item.id}' ORDER BY CREATE_TIME DESC;`;
          database.query(articleSql, (error1, results1) => {
            if (error1) {
              return database.rollback(() => {
                throw error1;
              });
            }
            articlesList.push({
              id: results1[0].ARTICLE_ID,
              modifyTime: results1[0].CREATE_TIME,
              title: results1[0].TITLE,
              abstract: results1[0].ABSTRACT,
              content: results1[0].CONTENT,
              createTime: item.createTime,
            });
            if (items.length === index + 1) {
              database.commit((err2) => {
                if (err2) {
                  return database.rollback(() => {
                    throw err2;
                  });
                }
                res.send(JSON.stringify({
                  status: 200,
                  data: articlesList,
                  msg: '获取文章列表成功',
                }));
              });
            }
          });
        });
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
    const historySql = `SELECT ARTICLE_ID AS id, CREATE_TIME AS modifyTime, TITLE AS title, ABSTRACT AS abstract, CONTENT AS content FROM WEB_HISTORY_ARTICLE AS history WHERE history.ARTICLE_ID = '${req.params.id}' ORDER BY CREATE_TIME DESC LIMIT 1;`;
    const articleSql = `SELECT ID, IS_PUBLISH AS isPublish FROM WEB_ARTICLE WHERE ID = '${req.params.id}';`;
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      database.query(historySql, (error, results, fields) => {
        if (error) {
          return database.rollback(() => {
            throw error;
          });
        }
        const articleInfo = results[0];
        database.query(articleSql, (error2, results2, fileds) => {
          if (error2) {
            return database.rollback(() => {
              throw error2;
            });
          }
          Object.assign(articleInfo, { isPublish: results2[0].isPublish });
          database.commit((err2) => {
            if (err2) {
              return database.rollback(() => {
                throw err2;
              });
            }
            res.send(JSON.stringify({
              status: 200,
              data: articleInfo,
              msg: '获取文章详情成功',
            }));
          });
        });
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
    const userId = req.userInfo.userId;
    const articleSql = 'INSERT INTO WEB_ARTICLE SET ?';
    const articleParams = {
      ID: utils.getUuid(), // id
      TAG_ID: data.tagId, // tag id
      CREATE_TIME: data.createTime, // 创建时间
      TITLE: data.title, // 标题
      CONTENT: data.content, // 正文
      ABSTRACT: data.abstract, // 介绍
      IS_PUBLISH: false, // 添加文章时，默认是未发布状态
      USER_ID: userId,
      MODIFY_TIME: data.createTime, // 添加文章时，默认的修改时间为创建时间
    };
    const historyArticleSql = 'INSERT INTO WEB_HISTORY_ARTICLE SET ? ';
    const historyArticleParams = {
      ID: utils.getUuid(),
      ARTICLE_ID: articleParams.ID,
      CREATE_TIME: data.createTime,
      TITLE: data.title,
      ABSTRACT: data.abstract,
      CONTENT: data.content,
    };
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      database.query(articleSql, articleParams, (error, results, fields) => {
        if (error) {
          throw error;
        }
        database.query(historyArticleSql, historyArticleParams, (error2, results2, fields2) => {
          if (error2) {
            throw error;
          }
          database.commit((err2) => {
            if (err2) {
              return database.rollback(() => {
                throw err2;
              });
            }
            res.send(JSON.stringify({
              status: 200,
              data: {
                id: articleParams.ID,
                title: articleParams.TITLE,
              },
              msg: '添加成功',
            }));
          });
        });
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

/**
 * @description 在编辑文章时，自动保存文章到WEB_HISTORY_ARTICLE中
 * @param
 * @return
 */
router.post('/autoSave', (req, res) => {
  try {
    const data = req.body;
    if (!_.isObject(data)) {
      throw new Error('参数必须是一个对象');
    }
    if (_.isNull(data)) {
      throw new Error('参数不能为null');
    }
    const historyArticleSql = 'INSERT INTO WEB_HISTORY_ARTICLE SET ? ';
    const historyArticleParams = {
      ID: utils.getUuid(),
      ARTICLE_ID: data.id,
      CREATE_TIME: data.createTime,
      TITLE: data.title,
      ABSTRACT: data.abstract,
      CONTENT: data.content,
    };
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      database.query(`SELECT ID FROM WEB_HISTORY_ARTICLE WHERE ARTICLE_ID = '${data.id}' ORDER BY CREATE_TIME DESC;`, (error, results, fields) => {
        if (error) {
          return database.rollback(() => {
            throw error;
          });
        }
        // 历史记录最多保持30条, 如果等于30，则删除最早的一条
        if (results.length >= 30) {
          database.query(`DELETE FROM WEB_HISTORY WHERE ID = '${results[-1].ID}';`, (error2, results2, fields) => {
            if (error2) {
              return database.rollback(() => {
                throw error2;
              });
            }
          });
        }
        database.query(historyArticleSql, historyArticleParams, (error2, results2, fields) => {
          if (error2) {
            throw new Error(error2.message);
          }
          database.commit((err2) => {
            if (err2) {
              return database.rollback(() => {
                throw err2;
              });
            }
            res.send(JSON.stringify({
              status: 200,
              msg: '保存成功',
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
    if (!_.isUndefined(data.isPublish)) {
      sql += 'IS_PUBLISH = ?, ';
      params.push(data.isPublish);
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
        status: 200,
        data: {
          id: data.id,
        },
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
    const sql = `DELETE FROM WEB_ARTICLE WHERE ID = '${data.id}'`;
    const historySql = `DELETE FROM WEB_HISTORY_ARTICLE WHERE ARTICLE_ID = '${data.id}';`;
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      database.query(sql, (error, results, fields) => {
        if (error) {
          return database.rollback(() => {
            throw error;
          });
        }
        database.query(historySql, (error2, results2, fields2) => {
          if (error2) {
            return database.rollback(() => {
              throw error2;
            });
          }
          res.send(JSON.stringify({
            status: 200,
            msg: '删除成功',
          }));
        });
      });
    })
  } catch (e) {
    res.send(JSON.stringify({
      status: 400,
      msg: e.message,
      data: null,
    }));
  }
});
module.exports = router;
