<template>
  <div class="article-setting">
    <form v-if="articleInfo !== null">
      <div class="form-control row">
        <input type="text" placeholder="请输入标题" class="col-12" v-model = "article.title">
      </div>
      <!--<div class="form-control row">-->
        <!--<select class="col-12" v-model="tagId">-->
          <!--<option v-for="item in tagsList" :value="item.id">{{item.name}}</option>-->
        <!--</select>-->
      <!--</div>-->
      <div class="form-control row">
        <textarea name="" rows="10" class="col-12 article-content" v-model="article.content"></textarea>
      </div>
      <div class="form-control row">
        <button type="submit" class="btn btn-outline-primary col-3">取消</button>
        <button type="submit" class="btn btn-primary col-3"
                @click.stop="submitAddArticle">确定</button>
      </div>
    </form>
    <div v-else>
      没有数据
    </div>
  </div>
</template>

<script type="es6">
export default {
  props: {
    articleInfo: {
      type: Object,
    },
  },
  data() {
    return {
      article: {},
    };
  },
  watch: {
    articleInfo(newValue) {
      this.article = JSON.parse(JSON.stringify(this.articleInfo));
    },
  },
  created() {
  },
  methods: {
    /**
     * @description 发布文章
     * @param
     * @return
     */
    submitAddArticle() {
      this.$emit('submitAddArticle', 'true', this.article);
    },
  },
};
</script>

<style type="text/scss" lang="scss" scoped>
  .article-setting {
    .article-content {
      height: 100%;
    }
  }
</style>
