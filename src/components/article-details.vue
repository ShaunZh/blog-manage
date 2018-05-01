<template>
  <div class="article-details">

  </div>
</template>

<script type="es6">
export default {
  props: {
    // 父组件传递文章详情
    articleDetails: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      // 复制文章详情
      articleDetailsBk: null,
    };
  },
  created() {
    this.articleDetailsBk = this.articleDetails;
  },
  methods: {
  }
}
</script>

