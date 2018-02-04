<template>
  <div class="page-index">
    <div class="row">
      <div class="col-2">
        <TagsSetting :tagsList="tagsList" @getNewTag="getNewTag"
                     @changeTag="changeTag"
                     @deleteTag="deleteTag"
                     @updateTag="updateTag"
        ></TagsSetting>
      </div>
      <div class="col-2">
        <div class="add-article row" @click.stop="submitAddArticle('false')">
          <p class="p-2">
            <svg viewBox="0 0 1024 1024" width="15" height="15">
              <path xmlns="http://www.w3.org/2000/svg" d="M512.67794 65.291029C265.701966 65.004503 66.200236 263.518742 65.293587 510.472204c-0.916882 247.286036 198.739367 447.915449 446.048939 448.236767 247.38632 0.322341 447.196065-199.272509 447.366957-446.883957C958.882422 265.25734 759.426741 65.579601 512.67794 65.291029zM772.621251 544.93204c-0.64059 26.420743-15.491833 41.562605-41.989323 41.606607-47.989991 0.080841-95.982028 0.124843-143.972019 0.151449 0.01228 45.808302 0.017396 91.615581-0.026606 137.418766-0.033769 35.107589-13.380752 48.577369-48.030923 48.683792-19.839861 0.061398-39.694047 0.370437-59.528791-0.11154-26.414603-0.642636-41.552371-15.495926-41.596374-41.999556-0.079818-47.998177-0.12382-95.996354-0.150426-143.993508-47.941895-0.027629-95.882767-0.072655-143.826709-0.154519-26.546609-0.044002-41.48381-15.205307-42.060955-41.548278-0.478907-21.701255-0.385786-43.417859-0.038886-65.119113 0.438998-27.465538 15.230889-42.333154 42.967604-42.441625 47.653323-0.176009 95.307669-0.155543 142.959969-0.122797 0.027629-47.950082 0.072655-95.89914 0.154519-143.851269 0.041956-26.552749 15.20019-41.49302 41.537022-42.070164 21.694091-0.477884 43.408649-0.385786 65.103764-0.037862 27.460422 0.438998 42.323944 15.233959 42.432415 42.977837 0.176009 47.667649 0.155543 95.335299 0.122797 143.001925 45.796022-0.01228 91.591021-0.017396 137.38295 0.026606 35.100426 0.033769 48.565089 13.382798 48.671513 48.039109C772.796236 505.231853 773.105275 525.093203 772.621251 544.93204z" p-id="3098"/>
            </svg>
            新增文章</p>
        </div>
        <ul class="article-list p-0" v-if="articlesList.length">
          <li class="row border-bottom border-dark p-2 item"
              :class="{'bg-secondary': item.id === articlesList[currentArticleIndex].id}"
              v-for="(item, index) in articlesList"
              @click.stop = "currentArticleIndex = index">
              <div class="col-2"></div>
              <div class="col-8">{{item.title}}</div>
              <div class="col-2" v-show="item.id === articlesList[currentArticleIndex].id">
                <svg viewBox="0 0 1024 1024" width="15" height="15" >
                  <path  style="fill:#666" d="M905.86 428.021l-0.002 0-71.797-15.945c-5.594-17.868-12.887-34.998-21.324-51.473l38.849-64.668c14.509-23.2 21.803-57.282 0-79.129l-39.588-39.547c-10.662-10.708-24.994-15.206-39.461-15.206-14.985 0-30.151 4.895-41.465 12.759l-62.972 40.112c-16.343-8.477-33.384-15.731-51.125-21.499l-16.121-72.621c-4.806-26.654-28.1-55.492-58.989-55.492l-55.932 0c-30.897 0-49.815 29.276-55.932 55.93l-17.963 71.746c-18.917 6.03-37.143 13.761-54.445 22.897l-64.538-41.075c-11.361-7.865-26.481-12.759-41.512-12.759-14.42 0-28.752 4.497-39.46 15.206l-39.543 39.547c-21.848 21.846-14.507 55.93 0 79.128l40.854 68.078c-7.644 15.469-14.461 31.374-19.705 48.064l-71.75 15.946c-26.654 4.812-55.495 28.099-55.495 58.995l0 55.93c0 30.889 29.277 49.813 55.932 55.93l72.665 18.13c5.029 15.428 11.273 30.237 18.4 44.569l-40.899 68.165c-14.508 23.157-21.807 57.24 0 79.087l39.588 39.548c10.663 10.704 24.994 15.248 39.455 15.248 14.991 0 30.151-4.894 41.471-12.758l64.672-41.249c17.432 9.217 35.744 17.041 54.795 23.071l17.917 71.573c6.118 26.653 25.035 55.931 55.932 55.931l55.933 0c30.89 0 54.184-28.84 58.989-55.493l16.122-72.838c17.565-5.685 34.433-12.853 50.559-21.194l63.1 40.199c11.313 7.866 26.481 12.76 41.465 12.76 14.467 0 28.8-4.546 39.461-15.248l39.588-39.548c21.803-21.847 14.509-55.93 0-79.089l-38.89-64.757c7.819-15.38 14.596-31.371 20.055-47.976l72.671-18.132c26.655-6.115 55.932-25.039 55.932-55.93l0-55.93C961.354 456.121 932.516 432.833 905.86 428.021zM514.684 648.029c-74.593 0-135.333-60.562-135.333-134.931s60.739-134.889 135.333-134.889c74.588 0 135.287 60.52 135.287 134.889S589.272 648.029 514.684 648.029z" p-id="2223" fill="#ffffff">
                  </path>
                </svg>
              </div>
          </li>
        </ul>
        <div v-else>
          没有文章
        </div>
      </div>
      <div class="col-8">
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
import utils from '@/utils/functions';

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
