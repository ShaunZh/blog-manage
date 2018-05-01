<template>
  <div class="page-index">
    <div class="row no-gutters">
      <div class="col-2">
        <TagsSetting :tagsList="tagsList" @getNewTag="getNewTag"
                     @changeTag="changeTag"
                     @deleteTag="deleteTag"
                     @updateTag="updateTag"
        ></TagsSetting>
      </div>
      <div class="col-2">
        <ArticlesList :articlesList="articlesList">
        </ArticlesList>
      </div>
      <!--<div class="col-8">-->
        <!--<ArticleDetails @submitAddArticle="submitAddArticle"-->
                        <!--:articleInfo="articleInfo"></ArticleDetails>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script type="es6">
import TagsSetting from '@/components/tags-setting';
import ArticleDetails from '@/components/article-details';
import ArticlesList from '@/components/articles-list';
import axios from 'axios';
import utils from '@/utils/functions';

export default {
  components: {
    TagsSetting,
    // ArticleDetails,
    ArticlesList,
  },
  data() {
    return {
      tagsList: [], // 文集列表
      articlesList: [], // 文章列表
      currentTagIndex: null, // 当前标签索引
      currentArticleIndex: null, // 当前文章索引
      articleInfo: null, // 当前选中的文章信息
    };
  },
  created() {
    this.getTagsList();
  },
  watch: {
    currentTagIndex() {
      this.getArticlesList();
    },
    currentArticleIndex(newValue) {
      if (typeof newValue === 'number' && this.articlesList.length
        && this.articlesList[newValue] !== undefined) {
        this.getArticle();
      } else {
        this.articleInfo = null;
      }
    },
  },
  methods: {
    /**
     * @description 获取标签列表
     * @param
     * @return
     */
    getTagsList() {
      axios.get('http://127.0.0.1:3000/tags')
        .then((response) => {
          if (response.data.status === 200 && response.data.data.items !== undefined) {
            this.tagsList = response.data.data.items;
            this.currentTagIndex = 0;
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
    getArticlesList() {
      if (this.tagsList[this.currentTagIndex] !== undefined) {
        axios({
          url: `http://127.0.0.1:3000/articles?tagId=${this.tagsList[this.currentTagIndex].id}`,
          method: 'GET',
        })
          .then((response) => {
            if (response.data.status === 200 && response.data.data.items !== undefined) {
              this.articlesList = response.data.data.items.map(item =>
                Object.assign({}, item, { isDispSetting: false }));
              this.currentArticleIndex = this.articlesList.length ? 0 : null;
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
    getArticle() {
      let articleId = '';
      if (this.articlesList[this.currentArticleIndex] !== undefined) {
        articleId = this.articlesList[this.currentArticleIndex].id;
        axios.get(`http://127.0.0.1:3000/articles/${articleId}`)
          .then((response) => {
            if (response.data.status === 200 &&
                response.data.data.items !== undefined &&
                response.data.data.items.length) {
              this.articleInfo = response.data.data.items[0];
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
    getNewTag(newTag) {
      this.tagsList.push(newTag);
    },
    /**
     * @description 添加文章
     * @param
     * @return
     */
    addArticle(status) {
      if (status === 'success') {
        console.info('添加文章成功');
      } else {
        console.error('添加文章失败');
      }
    },
    /**
     * @description 改变当前选中的tag
     * @param
     * @return
     */
    changeTag(tagIndex) {
      this.currentTagIndex = tagIndex;
    },
    /**
     * @description 更新tag
     * @param
     * @return
     */
    updateTag(tagIndex, newName) {
      console.log(utils.getDate());
      const data = {
        id: this.tagsList[tagIndex].id,
        name: newName,
        modifyTime: utils.getDate(),
      };
      axios({
        url: 'http://127.0.0.1:3000/tags',
        method: 'PUT',
        data: data,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              type: 'success',
              message: '更新成功',
            });
            this.tagsList.splice(tagIndex, 1, data);
            // this.tagsList[tagIndex] = Object.assign({}, this.tagsList[tagIndex], {name: newName});
            // this.tagsList[tagIndex].name = newName;
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
     * @param
     * @return
     */
    submitAddArticle(isPublish, articleInfo) {
      debugger
      let title = '';
      let content = '';
      if (articleInfo === undefined) {
        title = utils.getDate().substr(0, 10);
        content = '';
      } else {
        title = articleInfo.title;
        content = articleInfo.content;
      }
      const articleData = {
        title,
        tagId: this.tagsList[this.currentTagIndex].id,
        authod: '大丸子',
        createTime: utils.getDate(),
        content,
        isPublish: isPublish || 'false',
      };
      axios({
        url: 'http://127.0.0.1:3000/articles',
        method: 'POST',
        data: JSON.stringify(articleData),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.articlesList.push(Object.assign(articleData, { id: response.data.data.id }));
            this.currentArticleIndex = this.articlesList.length - 1;
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
     * @description 删除tag及其下面的文章
     * @param
     * @return
     */
    deleteTag(index) {
      axios({
        url: 'http://127.0.0.1:3000/tags',
        method: 'DELETE',
        data: JSON.stringify({
          id: this.tagsList[index].id,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.tagsList.splice(index, 1);
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
  },
};
</script>

<style type="text/scss" lang="scss" scoped>
  .page-index {
    height: 100%;
    > .row {
      height: inherit;
    }
    .article-list .item {
      &:hover {
        cursor: pointer;
        background: #ccc;
      }
    }
    .add-article {
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
