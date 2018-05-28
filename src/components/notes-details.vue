<template>
  <div class="note-details">
    <form v-if="noteInfoBk !== null">
      <div class="form-group">
        <input type="text" class="form-control border-0 title" v-model="noteInfoBk.title" @input="autoSave" >
      </div>
      <div class="operation form-group row no-gutters" role="group">
        <!--<div class="row">-->
          <div class="col-6 text-left">
            <div>
              <!--图片-->
              <button type="button" class="btn">
                <svg viewBox="0 0 1098 1024"  p-id="5079" width="17.15625" height="16">
                  <path
                    d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
                    p-id="5080">
                  </path>
                </svg>
              </button>
              <!-- undo -->
              <button type="button" class="btn ">
                <svg  viewBox="0 0 1024 1024" p-id="5896" width="17.15625" height="16">
                  <path
                    d="M511.999488 207.534683 511.999488 82.621742 282.673499 276.332583l229.325989 154.214291L511.999488 299.264874c151.300938 0 275.190573 123.799584 275.190573 275.190573 0 151.389966-123.888612 275.190573-275.190573 275.190573-151.300938 0-275.190573-123.799584-275.190573-275.190573l-91.730191 0c0 201.824635 165.096129 366.920764 366.920764 366.920764s366.920764-165.097152 366.920764-366.920764S713.8231 207.534683 511.999488 207.534683L511.999488 207.534683z"
                    p-id="5897">
                  </path>
                </svg>
              </button>
              <!-- redo -->
              <button type="button" class="btn ">
                <svg width="16px" height="16px" viewBox="0 0 485.212 485.212">
                  <path
                    d="M242.607,424.559c-75.252,0-136.468-61.209-136.468-136.465c0-75.252,61.216-136.466,136.468-136.466v90.978   l151.629-121.302L242.607,0v90.978c-108.687,0-197.117,88.432-197.117,197.117c0,108.691,88.43,197.118,197.117,197.118   c108.687,0,197.114-88.427,197.114-197.118h-60.645C379.077,363.35,317.859,424.559,242.607,424.559z"/>
                </svg>
              </button>
              <!--历史记录-->
              <button type="button" class="btn ">
                <svg viewBox="0 0 1024 1024" version="1.1" p-id="7571" width="16" height="16">
                  <path d="M532.960893 546.728966c7.798617-4.733814 12.96222-13.329587 12.96222-23.14821L545.923112 253.954923c0-15.138792-12.084223-27.047006-26.976398-27.047006-14.998599 0-26.976398 12.109806-26.976398 27.047006l0 251.711835L312.090483 505.666758c-14.787798 0-26.941606 12.07399-26.941606 26.976398 0 14.997576 12.065803 26.975375 26.941606 26.975375L509.988692 559.618531C519.648702 559.618531 528.184099 554.464137 532.960893 546.728966z"
                  p-id="7572">
                  </path>
                  <path d="M509.953899 65.048505c-248.303202 0-449.610044 201.297632-449.610044 449.610044 0 248.314459 201.306842 449.610044 449.610044 449.610044 248.304226 0 449.610044-201.295586 449.610044-449.610044C959.563944 266.346137 758.258125 65.048505 509.953899 65.048505zM509.953899 910.314775c-218.516806 0-395.657248-177.138396-395.657248-395.657248 0-218.517829 177.139419-395.657248 395.657248-395.657248 218.517829 0 395.657248 177.139419 395.657248 395.657248C905.611148 733.177402 728.471728 910.314775 509.953899 910.314775z"
                   p-id="7573">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <div class="col-6 text-right position-relative">
            <div class="mr-5 pr-5">
              <!--保存-->
              <button type="button" class="btn" @click.stop.prevent="autoSave">
                <svg viewBox="0 0 1024 1024" p-id="8897" width="16" height="16">
                  <path
                    d="M832 928H192c-52.8 0-96-43.2-96-96V192c0-52.8 43.2-96 96-96h576c8 0 16 3.2 22.4 9.6l128 128c6.4 6.4 9.6 14.4 9.6 22.4v576c0 52.8-43.2 96-96 96zM192 160c-17.6 0-32 14.4-32 32v640c0 17.6 14.4 32 32 32h640c17.6 0 32-14.4 32-32V268.8L755.2 160H192z"
                    p-id="8898">
                  </path>
                  <path
                    d="M736 928H288c-17.6 0-32-14.4-32-32V643.2c0-54.4 44.8-99.2 99.2-99.2h315.2c54.4 0 99.2 44.8 99.2 99.2V896c-1.6 17.6-16 32-33.6 32z m-416-64h384V643.2c0-19.2-16-35.2-35.2-35.2H355.2C336 608 320 624 320 643.2V864zM635.2 416H388.8c-46.4 0-84.8-38.4-84.8-84.8V128c0-17.6 14.4-32 32-32h352c17.6 0 32 14.4 32 32v203.2c0 46.4-38.4 84.8-84.8 84.8zM368 160v171.2c0 11.2 9.6 20.8 20.8 20.8h246.4c11.2 0 20.8-9.6 20.8-20.8V160H368z"
                    p-id="8899">
                  </path>
                  <path
                    d="M576 304c-17.6 0-32-14.4-32-32v-32c0-17.6 14.4-32 32-32s32 14.4 32 32v32c0 17.6-14.4 32-32 32z"
                    p-id="8900">
                  </path>
                </svg>
              </button>
              <!--预览-->
              <button type="button" class="btn ">
                <svg  t="1527437331371" class="icon" style="" viewBox="0 0 1024 1024"  p-id="2537" width="16" height="16">
                  <path d="M512.122 272.146c-247.216 0-412.027 247.216-412.027 247.216s164.811 247.216 412.027 247.216c247.216 0 412.027-247.216 412.027-247.216S759.217 272.146 512.122 272.146z m0 410.207c-90.537 0-163.962-73.424-163.962-163.962s73.424-163.962 163.962-163.962c90.537 0 163.962 73.424 163.962 163.962-0.122 90.658-73.424 163.962-163.962 163.962z m-82.406-163.476c0 21.482 8.86 42.841 24.03 58.012s36.53 24.03 58.012 24.03 42.841-8.86 58.012-24.03c15.17-15.17 24.03-36.53 24.03-58.012s-8.86-42.841-24.03-58.012c-15.17-15.17-36.53-24.03-58.012-24.03s-42.841 8.86-58.012 24.03c-15.17 15.292-24.03 36.53-24.03 58.012z"
                   p-id="2538"/>
                </svg>
              </button>
              <!--全屏-->
              <button type="button" class="btn ">
                <svg t="1527437151947" class="icon" style="" viewBox="0 0 1024 1024" p-id="9645" width="16" height="16">
                  <path d="M916 380c-26.4 0-48-21.6-48-48L868 223.2 613.6 477.6c-18.4 18.4-48.8 18.4-68 0-18.4-18.4-18.4-48.8 0-68L800 156 692 156c-26.4 0-48-21.6-48-48 0-26.4 21.6-48 48-48l224 0c26.4 0 48 21.6 48 48l0 224C964 358.4 942.4 380 916 380zM231.2 860l108.8 0c26.4 0 48 21.6 48 48s-21.6 48-48 48l-224 0c-26.4 0-48-21.6-48-48l0-224c0-26.4 21.6-48 48-48 26.4 0 48 21.6 48 48L164 792l253.6-253.6c18.4-18.4 48.8-18.4 68 0 18.4 18.4 18.4 48.8 0 68L231.2 860z"
                  p-id="9646"/></svg>
              </button>
            </div>
            <!--发布状态-->
            <button class="btn btn-operation position-absolute " style="font-size: 80%; top: 0; right: 0; height: 100%;" type="button" @click.stop.prevent="noteOperation" @mouseenter="noteStatusDeal" @mouseleave="leaveNoteStatusDeal">
                <span v-if="noteStatus === 'update'">
                 <svg viewBox="0 0 1024 1024" width="14px" height="14px">
                   <path
                     d="M286.016 737.792A319.104 319.104 0 0 1 467.2 195.488L461.632 92.8a421.568 421.568 0 0 0-248 717.28L128 895.744l268.128 14.72-14.72-268.128zM810.304 213.888L896 128.256l-268.128-14.72 14.72 268.128 95.424-95.424A319.072 319.072 0 0 1 556.8 828.512l5.568 102.688a421.472 421.472 0 0 0 247.936-717.312z"
                     fill="#707070" p-id="1743">
                   </path>
                 </svg>
                  发布更新
                </span>
              <span v-else-if="noteStatus === 'published'" class="pl-1 ml-2" >
                <svg viewBox="0 0 1024 1024" width="15px" height="15px">
                  <path
                    d="M927.97968 108.360629a50.575037 50.575037 0 0 0-69.085501 18.517689l-391.898737 678.933747-316.000056-182.409708A50.575037 50.575037 0 0 0 100.427574 711.005546l359.812488 207.690002a50.553362 50.553362 0 0 0 69.078276-18.517689L946.504593 177.44613a50.575037 50.575037 0 0 0-18.524913-69.085501z"
                    fill="#707070" p-id="5787">
                  </path>
                </svg>
                已发布
                </span>
              <span v-else-if="noteStatus === 'undoPublish'">
                  <svg viewBox="0 0 1024 1024" width="15px" height="15px">
                    <path
                      d="M609.206 396.656H193.504l201.87-199.152c17.787-17.787 17.787-43.185 0-60.973s-41.555-18.641-59.42-0.778L62.857 402.557c-17.787 17.787-17.787 41.399 0 59.186L336.03 728.858c17.787 17.787 41.555 17.787 59.42-0.078 17.787-17.787 17.787-41.166 0-58.953L193.502 474.326h415.702c166.219 0 311.155 129.712 311.155 290.029v41.555c0 23.769 15.069 41.555 38.836 41.555s38.836-17.787 38.836-41.555v-41.555c0-207.852-175.073-367.7-388.828-367.7z"
                      fill="" p-id="1753">
                    </path>
                  </svg>
                撤销发布
                </span>
              <span v-else-if="noteStatus === 'noPublish'">
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
        <!--</div>-->
      </div>
      <!--<div class="content">-->
        <textarea class="content border-0 pl-3 pr-3 text-left" v-model="noteInfoBk.content" @input="autoSave"></textarea>
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
      noteStatus: '', // 'noPublish'-未发布，'published'-已发布，'update'-发布更新
      noteStatusBk: '', // 备份noteStatus
    };
  },
  watch: {
    noteInfo(newVal) {
      this.noteInfoBk = newVal;
      if (this.noteInfoBk.isPublish) {
        if (this.noteInfoBk.isUpdate) {
          this.noteStatus = 'update';
        } else {
          this.noteStatus = 'published';
        }
      } else {
        this.noteStatus = 'noPublish';
      }
    },
  },
  // created() {
  //   this.noteInfoBk = this.noteInfo;
  // },
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
            this.noteStatus = this.noteInfoBk.isPublish ? 'update' : 'noPublish';
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
    noteOperation() {
      switch (this.noteStatus) {
        case 'update':
        case 'noPublish':
          // 更新或没有发布的文章，则发布
          this.noteInfoBk.isPublish = true;
          this.noteInfoBk.modifyTime = utils.getDate();
          this.noteStatus = 'published';
          this.$emit('publish', this.noteInfoBk);
          break;
        case 'undoPublish':
          // 已发布,则撤销发布
          this.noteInfoBk.isPublish = false;
          this.noteInfoBk.modifyTime = utils.getDate();
          this.noteStatus = 'noPublish';
          this.$emit('publish', this.noteInfoBk);
          break;
        default: break;
      }
    },
    /**
     * @description 笔记状态处理
     * @param
     * @return
     */
    noteStatusDeal() {
      if (this.noteStatus === 'published') {
        this.noteStatusBk = this.noteStatus;
        this.noteStatus = 'undoPublish';
      }
    },
    /**
     * @description 离开时笔记状态处理
     * @param
     * @return
     */
    leaveNoteStatusDeal() {
      if (this.noteStatus === 'undoPublish') {
        this.noteStatus = this.noteStatusBk;
      }
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
        .btn {
          background: transparent;
          outline: 0 !important;
          &:hover {
            background: #595959;
          }
        }
        .btn-operation {
          &:hover {
            background: #595959;
            color: #fff;
          }
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
