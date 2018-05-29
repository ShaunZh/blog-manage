<template>
  <div class="page-index">
    <div class="row no-gutters">
      <div class="col-2">
        <Notebooks :notebooksList="notebooksList" @getNewNotebook="getNewNotebook"
                   @changeNotebook="changeNotebook"
                   @deleteNotebook="deleteNotebook"
                   @updateNotebook="updateNotebook"
        >
        </Notebooks>
      </div>
      <div class="col-3">
        <NotesList :notesList="notesList"
                   @submitAddNote="submitAddNote"
                   @deleteNote="deleteNote"
                   @switchNote="getNote"
        >
        </NotesList>
      </div>
      <div class="col-7">
        <NoteDetails :noteInfo="noteInfo"
                     @submitAddNote="submitAddNote"
                     @publish="publishNote"
                     @autoSaveNote="autoSaveNote"
        >
        </NoteDetails>
      </div>
    </div>
  </div>
</template>

<script type="es6">
import Notebooks from '@/components/notebooks';
import NoteDetails from '@/components/notes-details';
import NotesList from '@/components/notes-list';
import axios from 'axios';
import utils from '@/utils/functions';

export default {
  components: {
    Notebooks,
    NoteDetails,
    NotesList,
  },
  data() {
    return {
      notebooksList: [], // 文集列表
      notesList: [], // 文章列表
      currentNotebookIndex: null, // 当前标签索引
      currentNoteIndex: null, // 当前文章索引
      noteInfo: null, // 当前选中的文章信息
    };
  },
  created() {
    this.getNotebooksList();
  },
  watch: {
    currentNotebookIndex() {
      this.getNotesList();
    },
    currentNoteIndex(newValue) {
      if (typeof newValue === 'number' && this.notesList.length
        && this.notesList[newValue] !== undefined) {
        this.getNote(newValue);
      } else {
        this.noteInfo = null;
      }
    },
  },
  methods: {
    /**
     * @description 获取笔记本列表
     * @param
     * @return
     */
    getNotebooksList() {
      axios.get(this.$appConfig.api.notebooks.list)
        .then((response) => {
          if (response.data.status === 200 && response.data.data.items !== undefined) {
            this.notebooksList = response.data.data.items;
            this.currentNotebookIndex = 0;
          } else {
            console.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /**
     * @description 获取文章列表
     * @param
     * @return
     */
    getNotesList() {
      if (this.notebooksList[this.currentNotebookIndex] !== undefined) {
        axios({
          url: `${this.$appConfig.api.notes.list}?notebookId=${this.notebooksList[this.currentNotebookIndex].id}`,
          method: 'GET',
        })
          .then((response) => {
            if (response.data.status === 200 && response.data.data.items !== undefined) {
              // todo : isDispSetting 是用于控制显示设置信息的开关，不应该在此处放在notesList中，应该放在aritcls-list.vue中
              this.notesList = response.data.data.items.map(item =>
                Object.assign({}, item, {isDispSetting: false}));
              this.currentNoteIndex = this.notesList.length ? 0 : null;
            } else {
              throw new Error(response.data.msg);
            }
          })
          .catch((error) => {
            console.error(`获取文章列表错误: ${error.message}`);
          });
      }
    },
    /**
     * @description 获取文章
     * @param
     * @return
     */
    getNote(index) {
      let noteId = '';
      if (this.notesList[index] !== undefined) {
        noteId = this.notesList[index].id;
        axios.get(`${this.$appConfig.api.notes.get}/${noteId}`)
          .then((response) => {
            if (response.data.status === 200 &&
              response.data.data !== undefined) {
              this.noteInfo = response.data.data;
              this.currentNoteIndex = index;
            } else {
              throw new Error(response.data.msg);
            }
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      }
    },
    /**
     * @description 获取新标签
     * @param
     * @return
     */
    getNewNotebook(newNotebook) {
      this.notebooksList.push(newNotebook);
    },
    /**
     * @description 添加文章
     * @param
     * @return
     */
    addNote(status) {
      if (status === 'success') {
        console.info('添加文章成功');
      } else {
        console.error('添加文章失败');
      }
    },
    /**
     * @description 改变当前选中的notebook
     * @param
     * @return
     */
    changeNotebook(notebookIndex) {
      this.currentNotebookIndex = notebookIndex;
    },
    /**
     * @description 更新notebook
     * @param
     * @return
     */
    updateNotebook(notebookIndex, newName) {
      console.log(utils.getDate());
      const data = {
        id: this.notebooksList[notebookIndex].id,
        name: newName,
        modifyTime: utils.getDate(),
      };
      axios({
        url: this.$appConfig.api.notebooks,
        method: 'PUT',
        data,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              type: 'success',
              message: '更新成功',
            });
            this.notebooksList.splice(notebookIndex, 1, data);
            // this.notebooksList[notebookIndex] = Object.assign({}, this.notebooksList[notebookIndex], {name: newName});
            // this.notebooksList[notebookIndex].name = newName;
          } else {
            throw new Error(response.msg);
          }
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error.message,
          });
        })
    },
    /**
     * @description 添加文章
     * @param {isPublish}Boolean —— true: 未发表， false：发表
     *        {sort}number —— 1：文章排在文集的最前面；-1：文章排在文集的最后面
     *        {noteInfo}object —— 文章信息
     * @return
     */
    submitAddNote(isPublish, sort, noteInfo) {
      let title = '';
      let content = '';
      // 当文章信息为undefined时，设置文章标题为日期
      if (noteInfo === undefined) {
        title = utils.getDate().substr(0, 10);
        content = '';
      } else {
        title = noteInfo.title;
        content = noteInfo.content;
      }
      const noteData = {
        title,
        notebookId: this.notebooksList[this.currentNotebookIndex].id,
        createTime: utils.getDate(),
        content,
        sort,
      };
      axios({
        url: this.$appConfig.api.notes.add,
        method: 'POST',
        data: JSON.stringify(noteData),
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.notesList.push(Object.assign(noteData, { id: response.data.data.id, isDispSetting: false }));
            this.currentNoteIndex = this.notesList.length - 1;
            this.$message({
              type: 'success',
              message: '添加文章成功!',
            });
          } else {
            throw new Error(`添加文章失败: ${response.msg}`);
          }
        })
        .catch((error) => {
          this.$message.error(`添加文章失败: ${error}`);
        });
    },
    /**
     * @description 删除notebook及其下面的文章
     * @param
     * @return
     */
    deleteNotebook(index) {
      axios({
        url: this.$appConfig.api.notebooks,
        method: 'DELETE',
        data: JSON.stringify({
          id: this.notebooksList[index].id,
        }),
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.notebooksList.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          } else {
            throw new Error(response.msg);
          }
        })
        .catch((error) => {
          console.error(`删除失败：${error.message}`);
        });
    },
    /**
     * @description 删除文章
     * @param
     * @return
     */
    deleteNote(index) {
      axios({
        url: this.$appConfig.api.notes.remove,
        method: 'DELETE',
        data: JSON.stringify({
          id: this.notesList[index].id,
        }),
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.notesList.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          } else {
            throw new Error(response.msg);
          }
        })
        .catch((error) => {
          this.$notify.error({
            message: `删除失败：${error.message}`,
          });
        });
    },
    /**
     * @description 发布文章
     * @param {isPublish}Boolean —— true：发布，false：撤销发布
     *        {noteInfo}Object —— 发布的文章信息
     * @return
     */
    publishNote(noteInfo) {
      axios({
        url: this.$appConfig.api.notes.update,
        method: 'PUT',
        data: JSON.stringify(noteInfo),
      })
        .then((response) => {
          debugger
          if (response.data.status === 200) {
            Object.assign(this.notesList[this.currentNoteIndex], noteInfo);
          } else {
            throw new Error(response.data.message);
          }
        })
        .catch((error) => {
          this.$notify.error({
            message: error.message,
          });
        });
    },
    /**
     * @description 自动保存
     * @param
     * @return
     */
    autoSaveNote(noteInfo) {
      Object.assign(this.notesList[this.currentNoteIndex], noteInfo);
    },
  },
};
</script>

<style type="text/scss" lang="scss" scoped>
  .page-index {
    height: 100%;
    > .row {
      height: inherit;
    }
    .note-list .item {
      &:hover {
        cursor: pointer;
        background: #ccc;
      }
    }
    .add-note {
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
