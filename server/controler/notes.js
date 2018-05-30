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
    const notesList = [];
    // let limit = 5;
    // let offset = 0;
    let sql = `SELECT ID, IS_PUBLISH, CREATE_TIME FROM WEB_NOTE `;
    // 判断传入的参数
    if (_.isObject(data)) {
      // 是否返回指定notebook的文章列表
      if (!_.isUndefined(data.notebookId) && data.notebookId !== '') {
        sql += `WHERE NOTEBOOK_ID = "${data.notebookId}" `;
      }
      // if (!_.isUndefined(data.offset) && _.isNumber(data.offset)) {
      //   offset = data.offset;
      // }
      // if (!_.isUndefined(data.limit) && _.isNumber(data.limit)) {
      //   limit = data.limit;
      // }
    }
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      sql += `ORDER BY CREATE_TIME DESC `;
      // 查询NOTE表中的文章了列表，该表中包含有已发布的和未发布的所有文章，注意：不包含历史文章
      database.query(sql, (error, results) => {
        if (error) {
          return database.rollback(() => {
            throw error;
          });
        }
        // 获取NOTE表中的文章列表，该列表中包含了已发布和未发布的文章列表信息
        const items = (JSON.parse(JSON.stringify(results))).map((item) => {
          return {
            id: item.ID,
            isPublish: item.IS_PUBLISH,
            createTime: item.CREATE_TIME,
          };
        });
        // 获取文章列表，该文章列表包含的是文章最新修改的信息，并不是已发布的文章信息
        items.map((item, index) => {
          const noteSql = `SELECT NOTE_ID, CREATE_TIME, TITLE, ABSTRACT, CONTENT FROM WEB_HISTORY_NOTE WHERE NOTE_ID = '${item.id}' ORDER BY CREATE_TIME DESC;`;
          database.query(noteSql, (error1, results1) => {
            if (error1) {
              return database.rollback(() => {
                throw error1;
              });
            }
            notesList.push({
              id: results1[0].NOTE_ID,
              modifyTime: results1[0].CREATE_TIME,
              title: results1[0].TITLE,
              abstract: results1[0].ABSTRACT,
              content: results1[0].CONTENT,
              createTime: item.createTime,
              isPublish: item.isPublish,
              isUpdate: item.isUpdate || false,
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
                  data: {
                    items: notesList,
                  },
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
    const historySql = `SELECT NOTE_ID AS id, CREATE_TIME AS modifyTime, TITLE AS title, ABSTRACT AS abstract, CONTENT AS content, IS_UPDATE AS isUpdate FROM WEB_HISTORY_NOTE AS history WHERE history.NOTE_ID = '${req.params.id}' ORDER BY CREATE_TIME DESC LIMIT 1;`;
    const noteSql = `SELECT ID, IS_PUBLISH AS isPublish FROM WEB_NOTE WHERE ID = '${req.params.id}';`;
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
        const noteInfo = results[0];
        database.query(noteSql, (error2, results2, fileds) => {
          if (error2) {
            return database.rollback(() => {
              throw error2;
            });
          }
          Object.assign(noteInfo, { isPublish: results2[0].isPublish });
          database.commit((err2) => {
            if (err2) {
              return database.rollback(() => {
                throw err2;
              });
            }
            res.send(JSON.stringify({
              status: 200,
              data: noteInfo,
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
    const noteSql = 'INSERT INTO WEB_NOTE SET ?';
    const noteParams = {
      ID: utils.getUuid(), // id
      NOTEBOOK_ID: data.notebookId, // notebook id
      CREATE_TIME: data.createTime, // 创建时间
      TITLE: data.title, // 标题
      CONTENT: data.content, // 正文
      ABSTRACT: data.abstract, // 介绍
      IS_PUBLISH: false, // 添加文章时，默认是未发布状态
      USER_ID: userId,
      MODIFY_TIME: data.createTime, // 添加文章时，默认的修改时间为创建时间
    };
    const historyNoteSql = 'INSERT INTO WEB_HISTORY_NOTE SET ? ';
    const historyNoteParams = {
      ID: utils.getUuid(),
      NOTE_ID: noteParams.ID,
      CREATE_TIME: data.createTime,
      TITLE: data.title,
      ABSTRACT: data.abstract,
      CONTENT: data.content,
    };
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      database.query(noteSql, noteParams, (error, results, fields) => {
        if (error) {
          throw error;
        }
        database.query(historyNoteSql, historyNoteParams, (error2, results2, fields2) => {
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
                id: noteParams.ID,
                title: noteParams.TITLE,
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
 * @description 在编辑文章时，自动保存文章到WEB_HISTORY_NOTE中
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
    const historyNoteSql = 'INSERT INTO WEB_HISTORY_NOTE SET ? ';
    const historyNoteParams = {
      ID: utils.getUuid(),
      NOTE_ID: data.id,
      CREATE_TIME: data.modifyTime,
      TITLE: data.title,
      ABSTRACT: data.abstract,
      CONTENT: data.content,
      IS_UPDATE: data.isUpdate,
    };
    database.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      database.query(`SELECT ID FROM WEB_HISTORY_NOTE WHERE NOTE_ID = '${data.id}' ORDER BY CREATE_TIME DESC;`, (error, results, fields) => {
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
        database.query(historyNoteSql, historyNoteParams, (error2, results2, fields) => {
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
    if (_.isUndefined(data.modifyTime)) {
      throw new Error('没有修改时间');
    }
    if (_.isUndefined(data.isPublish)) {
      throw new Error('没有发布参数');
    }
    const updateSql = `UPDATE WEB_NOTE SET TITLE = ?, CONTENT = ?, ABSTRACT = ?, MODIFY_TIME = ?, IS_PUBLISH = ? WHERE ID = '${data.id}';`;
    const historySql = `SELECT NOTE_ID, TITLE AS title, CONTENT AS content, ABSTRACT AS abstract FROM WEB_HISTORY_NOTE WHERE NOTE_ID = '${data.id}' ORDER BY CREATE_TIME DESC LIMIT 1;`;
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
        if (results.length) {
          const updateData = results[0];
          database.query(`UPDATE WEB_HISTORY_NOTE SET IS_UPDATE = 0 WHERE NOTE_ID = '${data.id}';`, (error1, results, fields) => {
            if (error1) {
              return database.rollback(() => {
                throw error1;
              });
            }
            database.query(updateSql, [updateData.title, updateData.content, updateData.abstract, data.modifyTime, data.isPublish], (error2, results2, fields2) => {
              if (error2) {
                return database.rollback(() => {
                  throw error2;
                });
              }
              database.commit((err2) => {
                if (err2) {
                  throw database.rollback(() => {
                    throw error;
                  });
                }
                res.send(JSON.stringify({
                  status: 200,
                  msg: data.isPublish ? '发布成功' : '撤销成功',
                }));
              });
            });
          });
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
    const sql = `DELETE FROM WEB_NOTE WHERE ID = '${data.id}'`;
    const historySql = `DELETE FROM WEB_HISTORY_NOTE WHERE NOTE_ID = '${data.id}';`;
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
