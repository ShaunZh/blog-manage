<template>
  <div class="note-details">
    <form v-if="noteInfoBk !== null">
      <div class="form-group">
        <input type="text" class="form-control border-0 title" v-model="noteInfoBk.title" @input="autoSave" >
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

              <button class="btn" type="button" @click.stop.prevent="publish">
                <span v-if="noteInfoBk.isUpdate && noteInfoBk.isPublish">
                 <svg viewBox="0 0 1024 1024" width="15px" height="15px">
                   <path
                     d="M286.016 737.792A319.104 319.104 0 0 1 467.2 195.488L461.632 92.8a421.568 421.568 0 0 0-248 717.28L128 895.744l268.128 14.72-14.72-268.128zM810.304 213.888L896 128.256l-268.128-14.72 14.72 268.128 95.424-95.424A319.072 319.072 0 0 1 556.8 828.512l5.568 102.688a421.472 421.472 0 0 0 247.936-717.312z"
                     fill="#707070" p-id="1743">
                   </path>
                 </svg>
                  发布更新
                </span>
                <span v-else-if="noteInfoBk.isPublish">
                <svg viewBox="0 0 1024 1024" width="15px" height="15px">
                  <path
                    d="M927.97968 108.360629a50.575037 50.575037 0 0 0-69.085501 18.517689l-391.898737 678.933747-316.000056-182.409708A50.575037 50.575037 0 0 0 100.427574 711.005546l359.812488 207.690002a50.553362 50.553362 0 0 0 69.078276-18.517689L946.504593 177.44613a50.575037 50.575037 0 0 0-18.524913-69.085501z"
                    fill="#707070" p-id="5787">
                  </path>
                </svg>
                已发布
                </span>
                <span v-else>
                <svg viewBox="0 0 1024 1024" width="15px" height="15px">
                  <path
                    d="M426.053024 331.626933l0-169.619142-331.490833 300.725132 331.490833 300.789601L426.053024 581.63394c92.097558 0 376.594077 0 499.373425 281.257755l0-31.251771C925.426449 706.636932 802.629705 305.014832 426.053024 331.626933z"
                    p-id="4121" fill="#8a8a8a">
                  </path>
                </svg>
                发布文章
                </span>

              </button>
            </div>
          </div>
        <!--</div>-->
      </div>
      <!--<div class="content">-->
        <textarea class="content border-0" v-model="noteInfoBk.content"></textarea>
      <!--</div>-->
    </form>
  </div>
</template>

<script type="es6">
import axios from 'axios';
import utils from '@/utils/functions';

const _ = require('lodash');
export default {
  props: {
    // 父组件传递文章信息
    noteInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      noteInfoBk: this.noteInfo,
      autoSave: _.debounce(this.autoSaveNote, 1000),
    };
  },
  watch: {
    noteInfo(newVal) {
      this.noteInfoBk = newVal;
    },
  },
  created() {
    this.noteInfoBk = this.noteInfo;
  },
  methods: {
    /**
     * @description 自动保存文章
     * @param
     * @return
     */
    autoSaveNote() {
      axios({
        url: this.$appConfig.api.notes.autoSave,
        method: 'POST',
        data: JSON.stringify(Object.assign(this.noteInfoBk, {
          modifyTime: utils.getDate(),
          isUpdate: true,
        })),
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.$emit('autoSaveNote', {
              title: this.noteInfoBk.title,
              abstract: this.noteInfoBk.abstract,
              content: this.noteInfoBk.content,
              modifyTime: utils.getDate(),
              isUpdate: true,
            });
            console.log('保存成功');
          }
        })
        .catch((error) => {
          console.error(`保存失败: ${error.message}`);
        });
    },
    /**
     * @description 编辑标题
     * @param
     * @return
     */
    editTitle() {
      console.log('输入');
    },
    /**
     * @description 发布文章
     * @param
     * @return
     */
    publish() {
      // 如果已发布，则取消发布
      this.noteInfoBk.isPublish = !this.noteInfoBk.isPublish;
      this.noteInfoBk.modifyTime = new Date();
      this.$emit('publish', this.noteInfoBk);
    },
  },
};
</script>

<style type="text/css" lang="scss" scoped>
  .note-details {
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
