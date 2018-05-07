<template>
  <div class="tag-setting">
    <div class="go-to-blog pt-4 pb-4 text-center">
      <a class="px-4 py-2 ">回到首页</a>
    </div>
    <div class="add-tag py-2">
      <div class="pl-3 add-tag-btn " @click.stop="isDispAddTag = true">+ 新建文集</div>
      <form class="dispAddTag pl-3 my-1" v-show="isDispAddTag === true">
        <div class="form-group my-0">
          <input type="text" class="tag-input" placeholder="请输入文集名" autofocus v-model="newTagName">
        </div>
        <div class="form-group">
          <button type="submit" @click.stop="submitAddTag" class="add-btn btn btn-outline-success px-3 py-1 ">提交</button>
          <button type="submit" @click.stop="isDispAddTag = false" class="cancel-btn ml-1 btn">取消</button>
        </div>
      </form>
    </div>
    <ul class="tagsList p-0">
      <li class="item row mx-0 text-left py-3" :class="{active: item.id === tagsListBk[currentTag].id}"
          v-for="(item, index) in tagsListBk" @click.stop="changeTag(index)">
        <div class="col-9" >{{item.name}}</div>
        <div class="col-3" v-show="item.id === tagsListBk[currentTag].id">
          <svg viewBox="0 0 1024 1024" width="15" height="15"  @click.stop="item.isDispSetting = true" @blur.stop="item.isDispSetting = false">
            <path d="M905.86 428.021l-0.002 0-71.797-15.945c-5.594-17.868-12.887-34.998-21.324-51.473l38.849-64.668c14.509-23.2 21.803-57.282 0-79.129l-39.588-39.547c-10.662-10.708-24.994-15.206-39.461-15.206-14.985 0-30.151 4.895-41.465 12.759l-62.972 40.112c-16.343-8.477-33.384-15.731-51.125-21.499l-16.121-72.621c-4.806-26.654-28.1-55.492-58.989-55.492l-55.932 0c-30.897 0-49.815 29.276-55.932 55.93l-17.963 71.746c-18.917 6.03-37.143 13.761-54.445 22.897l-64.538-41.075c-11.361-7.865-26.481-12.759-41.512-12.759-14.42 0-28.752 4.497-39.46 15.206l-39.543 39.547c-21.848 21.846-14.507 55.93 0 79.128l40.854 68.078c-7.644 15.469-14.461 31.374-19.705 48.064l-71.75 15.946c-26.654 4.812-55.495 28.099-55.495 58.995l0 55.93c0 30.889 29.277 49.813 55.932 55.93l72.665 18.13c5.029 15.428 11.273 30.237 18.4 44.569l-40.899 68.165c-14.508 23.157-21.807 57.24 0 79.087l39.588 39.548c10.663 10.704 24.994 15.248 39.455 15.248 14.991 0 30.151-4.894 41.471-12.758l64.672-41.249c17.432 9.217 35.744 17.041 54.795 23.071l17.917 71.573c6.118 26.653 25.035 55.931 55.932 55.931l55.933 0c30.89 0 54.184-28.84 58.989-55.493l16.122-72.838c17.565-5.685 34.433-12.853 50.559-21.194l63.1 40.199c11.313 7.866 26.481 12.76 41.465 12.76 14.467 0 28.8-4.546 39.461-15.248l39.588-39.548c21.803-21.847 14.509-55.93 0-79.089l-38.89-64.757c7.819-15.38 14.596-31.371 20.055-47.976l72.671-18.132c26.655-6.115 55.932-25.039 55.932-55.93l0-55.93C961.354 456.121 932.516 432.833 905.86 428.021zM514.684 648.029c-74.593 0-135.333-60.562-135.333-134.931s60.739-134.889 135.333-134.889c74.588 0 135.287 60.52 135.287 134.889S589.272 648.029 514.684 648.029z" p-id="2223" fill="#ffffff">
            </path>
          </svg>
        </div>
        <ul class="setting-info p-0 bg-light" v-show="item.isDispSetting">
          <li class="modify px-3 py-2 ">
            <svg viewBox="0 0 1024 1024" width="15" height="15">
              <path d="M355.71712 558.96064c-0.512 0.65536-1.04448 1.37216-1.26976 2.23232l-40.18176 148.41856c-2.33472 8.64256 0.06144 17.98144 6.41024 24.53504 4.75136 4.64896 11.01824 7.22944 17.67424 7.22944 2.21184 0 4.42368-0.26624 6.59456-0.86016l146.30912-40.18176c0.22528 0 0.32768 0.22528 0.49152 0.22528 1.69984 0 3.33824-0.63488 4.58752-1.92512l391.168-394.0352c11.63264-11.71456 18.00192-27.68896 18.00192-45.056 0-19.6608-8.2944-39.36256-22.79424-53.94432l-36.94592-37.2736c-14.49984-14.62272-34.05824-22.97856-53.5552-22.97856-17.24416 0-33.0752 6.41024-44.76928 18.10432L356.29056 557.60896C355.88096 557.9776 356.02432 558.53056 355.71712 558.96064L355.71712 558.96064zM849.22368 265.99424l-38.85056 39.1168-62.99648-64.47104 38.31808-38.56384c6.0416-6.12352 17.8176-5.24288 24.73984 1.76128l36.94592 37.29408c3.87072 3.91168 6.08256 9.05216 6.08256 14.15168C853.44256 259.4816 851.92704 263.2704 849.22368 265.99424L849.22368 265.99424zM425.28768 565.16608l282.25536-284.40576 62.99648 64.53248L488.83712 629.10464 425.28768 565.16608 425.28768 565.16608 425.28768 565.16608M373.84192 680.448l20.39808-75.42784 54.39488 54.80448L373.84192 680.448 373.84192 680.448 373.84192 680.448M874.00448 422.15424c-14.82752 0-26.97216 12.14464-27.01312 27.2384l0 326.41024c0 51.95776-51.32288 75.85792-75.63264 75.85792L236.40064 851.6608c-34.0992 0-69.46816-33.71008-75.6736-96.33792L160.72704 258.10944c0-77.80352 56.54528-75.89888 75.6736-75.89888l356.352 0c14.86848 0 26.95168-12.1856 26.95168-27.17696 0-14.97088-12.0832-27.17696-26.95168-27.17696l-360.448 0c-46.63296 0-125.52192 29.22496-125.52192 105.6768l0 525.94688c0 102.83008 64.3072 146.61632 125.52192 146.61632l543.15008 0c69.0176 0 125.5424-43.17184 125.5424-126.13632L900.99712 449.24928C900.89472 434.29888 888.77056 422.15424 874.00448 422.15424L874.00448 422.15424z" p-id="3595" fill="#707070">
              </path>
            </svg>
            <span href="#" @mousedown.stop="modifyTag(index)">修改文集</span>
          </li>
          <li class="delete  px-3 py-2">
            <svg t="1517492385038"  viewBox="0 0 1024 1024" p-id="3246"  width="15" height="15"><path d="M830.061986 353.817328l-29.966499 567.691393c-1.102101 20.853957-18.330484 37.20025-39.21821 37.20025L263.122723 958.708971c-20.887726 0-38.116109-16.346293-39.21821-37.20025l-29.966499-567.691393c-1.140986-21.659299 15.489786-40.144302 37.148062-41.289382 21.759583-1.049912 40.148395 15.493879 41.289382 37.148062l28.000728 530.491143 423.248653 0 28.000728-530.491143c1.150196-21.663392 19.760043-38.130436 41.289382-37.148062C814.5722 313.674049 831.202972 332.158029 830.061986 353.817328zM934.164972 222.37467c0 21.687952-17.58347 39.271422-39.271422 39.271422L129.10645 261.646092c-21.687952 0-39.271422-17.58347-39.271422-39.271422s17.58347-39.271422 39.271422-39.271422l215.991286 0L345.097736 94.743828c0-18.97926 12.656251-29.453822 31.634488-29.453822l270.526343 0c18.97926 0 31.643698 10.474562 31.643698 29.453822l0 88.360444 215.991286 0C916.581502 183.104271 934.164972 200.687742 934.164972 222.37467zM413.821957 183.104271l196.356087 0L610.178043 134.01525 413.821957 134.01525 413.821957 183.104271zM430.287977 821.260529c0.274246 0 0.546446 0 0.824785 0 18.974144 0 33.988092-18.252713 33.542954-37.225833l-9.985422-424.467411c-0.446162-18.975167-16.005532-34.476209-35.162848-34.0587-18.974144 0.446162-33.988092 15.930831-33.542954 34.904974l9.985422 425.364851C396.390959 804.474214 411.683247 821.260529 430.287977 821.260529zM592.20981 821.260529c18.600637 0 33.898041-15.779382 34.339086-34.475186l9.985422-423.901523c0.446162-18.974144-14.56881-34.94693-33.542954-35.393091-19.270902-0.278339-34.717709 14.45727-35.162848 33.42732l-9.985422 424.308799c-0.446162 18.975167 14.56881 36.033681 33.542954 36.033681C591.664388 821.260529 591.93761 821.260529 592.20981 821.260529z" p-id="3247" fill="#707070"></path></svg>
            <span href="#" @mousedown.stop="deleteTag(index)">删除文集</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="es6">
import axios from 'axios';
import utils from '@/utils/functions';

export default {
  props: {
    tagsList: {
      type: Array,
      default: [],
      required: true,
    },
  },
  data() {
    return {
      newTagName: '',
      isDispAddTag: false,
      currentTag: 0,
      tagsListBk: null,
    };
  },
  watch: {
    isDispAddTag(newValue) {
      if (!newValue) {
        this.newTagName = '';
      }
    },
    tagsList(newValue) {
      this.tagsListBk = JSON.parse(JSON.stringify(newValue));
      this.tagsListBk = this.tagsListBk.map(item =>
        Object.assign({}, item, { isDispSetting: false }));
    },
  },
  created() {
    this.tagsListBk = JSON.parse(JSON.stringify(this.tagsList));
    this.tagsListBk = this.tagsListBk.map(item =>
      Object.assign({}, item, { isDispSetting: false }));
  },
  methods: {
    /**
     * @description 添加标签
     * @param
     * @return
     */
    submitAddTag() {
      const tagData = {
        name: this.newTagName,
        createTime: utils.getDate(),
      };
      axios({
        url: 'http://127.0.0.1:3000/tags',
        method: 'POST',
        data: JSON.stringify(tagData),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.$emit('getNewTag', response.data.data);
            this.isDispAddTag = false;
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    /**
     * @description 显示addTag设置
     * @param
     * @return
     */
    dispTagSetting() {
    },
    /**
     * @description 隐藏addTag设置
     * @param
     * @return
     */
    hiddenTagSetting() {
    },
    /**
     * @description 删除文集
     * @param
     * @return
     */
    deleteTag(index) {
      this.$confirm(`此操作将永久删除《${this.tagsList[index].name}》, 是否继续?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$emit('deleteTag', index);
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除',
        // });
      });
    },

    /**
     * @description 修改tag
     * @param
     * @return
     */
    modifyTag(index) {
      this.$prompt('请输入新的文集名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: this.tagsList[index].name,
      }).then(({ value }) => {
        this.$emit('updateTag', index, value);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入',
        });
      });

    },
    /**
     * @description 修改文集
     * @param
     * @return
     */
    modify() {

    },
    /**
     * @description 改变当前标签
     * @param
     * @return
     */
    changeTag(index) {
      this.currentTag = index;
      this.$emit('changeTag', index);
    },
    open() {
    },
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
  .tag-setting {
    background: #404040;
    color: #f2f2f2;
    height: 100%;
    .go-to-blog {
      > a{
        display: inline-block;
        width: 75%;
        border: 1px solid #ea725d;
        border-radius: 20px;
        color: #ea725d;
      }
    }
    .add-tag {
      .tag-input{
        height: 35px;
        color: #ccc;
        background-color: #595959;
        border: 1px solid #333;
        padding: 4px 6px;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 20px;
      }
      .add-tag-btn {
        &:hover {
          cursor: pointer;
        }
      }
      .add-btn {
        border: 1px solid #48be3a;
        border-radius: 20px;
      }
      .cancel-btn {
        border: 0;
        background: inherit;
        color: #999;
        &:hover {
          color: #aaa;
        }
      }
    }
    .tagsList {
      .item{
        position: relative;
        border-left: 3px solid #404040;
        &:hover {
          background: #666;
          cursor: pointer;
        }
        &.active{
          border-left: 3px solid #ea725d;
          background: #666;
          color: #ccc;
        }
        .setting-icon {
          position: relative;
        }
        .setting-info {
          position: absolute;
          top: 40px;
          right: 12px;
          border-radius: 5px;
          z-index: 5;
          /*border-top-left-radius: 5px;*/
          /*border-top-right-radius: 5px;*/
          /*border-bottom-left-radius: 5px;*/
          /*border-bottom-right-radius: 5px;*/
          color: #444;
          > li {
            list-style: none;
            &:hover {
              background: #666;
              cursor: pointer;
              color: #fff;
            }
          }
          > li:first-child {
            border-bottom: 1px solid #ddd;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
          > li:last-child {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          &:before {
            content: '';
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 15px solid #fff;
            position: absolute;
            top: -10px;
            right: 5px;
            z-index: -1;
          }
        }
      }
    }
  }


</style>
