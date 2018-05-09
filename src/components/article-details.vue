<template>
  <div class="article-details">
    <form v-if="articleInfoBk !== null">
      <div class="form-group">
        <input type="text" class="form-control border-0 title" :value="articleInfoBk.title" @change="editTitle">
      </div>

      <div class="operation form-group row no-gutters" role="group">
        <!--<div class="row">-->
          <div class="col-6 text-left">
            <div class="btn-group">
              <button type="button" class="btn">图片</button>
              <button type="button" class="btn ">undo</button>
              <button type="button" class="btn ">redo</button>
              <button type="button" class="btn ">历史版本</button>
            </div>
          </div>
          <div class="col-6 text-right ">
            <div class="btn-group">
              <button type="button" class="btn ">保存</button>
              <button type="button" class="btn ">预览</button>
              <button type="button" class="btn ">全屏</button>
              <button class="btn" type="button" @click="publish">
                <span v-if="articleInfoBk.isPublish" >
                <svg viewBox="0 0 1024 1024" width="15px" height="15px">
                  <path
                    d="M426.053024 331.626933l0-169.619142-331.490833 300.725132 331.490833 300.789601L426.053024 581.63394c92.097558 0 376.594077 0 499.373425 281.257755l0-31.251771C925.426449 706.636932 802.629705 305.014832 426.053024 331.626933z"
                    p-id="4121" fill="#8a8a8a">
                  </path>
                </svg>
                撤销发布
                </span>
                <span v-else>
                <svg viewBox="0 0 1024 1024" width="15px" height="15px">
                  <path
                    d="M927.97968 108.360629a50.575037 50.575037 0 0 0-69.085501 18.517689l-391.898737 678.933747-316.000056-182.409708A50.575037 50.575037 0 0 0 100.427574 711.005546l359.812488 207.690002a50.553362 50.553362 0 0 0 69.078276-18.517689L946.504593 177.44613a50.575037 50.575037 0 0 0-18.524913-69.085501z"
                    fill="#707070" p-id="5787">
                  </path>
                </svg>
                已发布
                </span>
              </button>
            </div>
          </div>
        <!--</div>-->
      </div>
      <!--<div class="content">-->
        <textarea class="content border-0" :value="articleInfoBk.content"></textarea>
      <!--</div>-->
    </form>
  </div>
</template>

<script type="es6">
export default {
  props: {
    // 父组件传递文章信息
    articleInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      articleInfoBk: null,
    };
  },
  watch: {
    articleInfo(newVal) {
      this.articleInfoBk = newVal;
    },
  },
  created() {
    this.articleInfoBk = this.articleInfo;
  },
  methods: {
    /**
     * @description 编辑标题
     * @param
     * @return
     */
    editTitle() {
    },
    /**
     * @description 发布文章
     * @param
     * @return
     */
    publish() {
      // 如果已发布，则取消发布
      debugger
      if (this.articleInfo.isPublish) {
        this.$emit('publish', false);
      } else {
        // 如果未发布，则发布
        this.$emit('publish', true, this.articleInfoBk);
      }
    },
  },
};
</script>

<style type="text/css" lang="scss" scoped>
  .article-details {
    height: 100%;
    form {
      height: 100%;
      .title {
        outline: 0 !important;
      }
      .operation {
        background: #d9d9d9;
        button {
          background: transparent;
          outline: 0 !important;
        }
      }
      .content {
        width: 100%;
        height: calc(100% - 112px);
        resize: none;
        &:focus{
          outline: none;
        }
      }
    }
  }
</style>
