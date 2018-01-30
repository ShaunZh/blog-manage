<template>
  <div class="page-index">
    <div class="row">
      <div class="col-2">
        <TagsSetting :tagsList="tagsList" @getNewTag="getNewTag"
                     @changeTag="changeTag"></TagsSetting>
      </div>
      <div class="col-3">
        <div class="add-article row" @click.stop="submitAddArticle('false')">
          <p class="p-2" >+ 新增文件夹</p>
        </div>
        <ul class="article-list p-0" v-if="articlesList.length">
          <li class="row border-bottom border-dark p-2 item"
              :class="{'bg-success': item.id === articlesList[currentArticleIndex].id}"
              v-for="(item, index) in articlesList"
              @click.stop = "currentArticleIndex = index">{{item.title}}</li>
        </ul>
        <div v-else>
          没有文章
        </div>
      </div>
      <div class="col-7">
        <ArticleSetting @submitAddArticle="submitAddArticle"
                         :articleInfo="articleInfo"></ArticleSetting>
      </div>
    </div>
  </div>
</template>

<script type="es6">
import TagsSetting from '@/components/tags-setting';
import ArticleSetting from '@/components/article-setting';
import axios from 'axios';
import utils from '@/utils/functions.js';

export default {
  components: {
    TagsSetting,
    ArticleSetting,
  },
  data() {
    return {
      tagsList: [],
      articlesList: [],
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
              this.articlesList = response.data.data.items;
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
            console.info('添加文章成功');
          } else {
            console.warn('添加文章失败');
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
  },
};
</script>

<style type="text/scss" lang="scss" scoped>
  .page-index {
    .article-list .item {
      &:hover {
        background: #ccc;
      }
    }
  }
</style>
