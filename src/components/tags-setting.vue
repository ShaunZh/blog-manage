<template>
  <div class="tag-setting pl-3">
    <div class="go-to-blog pt-4 pb-4 text-center">
      <a class="px-4 py-2 border border-info">回到首页</a>
    </div>
    <div class="add-tag py-1">
      <div class="pl-3 add-tag-btn " @click.stop="isDispAddTag = true">+ 新建文集</div>
      <form class="dispAddTag pl-3 my-1" v-show="isDispAddTag === true">
        <div class="form-group my-0">
          <input type="text" class="tag-input" placeholder="请输入文集名" v-model="newTagName">
        </div>
        <div class="form-group">
          <button type="submit" @click.stop="submitAddTag" class="add-btn btn btn-outline-success px-3 py-1 ">提交</button>
          <button type="submit" @click.stop="isDispAddTag = false" class="cancel-btn ml-1 btn">取消</button>
        </div>
      </form>
    </div>
    <ul class="tagsList p-0">
      <li class="item row mx-0 text-left py-2" :class="{active: item.id === tagsList[currentTag].id}" v-for="(item, index) in tagsList" @click.stop="changeTag(index)">
        <div class="col-9" >{{item.name}}</div>
        <div class="col-3" >
          <svg viewBox="0 0 1024 1024" width="15" height="15">
            <path d="M905.86 428.021l-0.002 0-71.797-15.945c-5.594-17.868-12.887-34.998-21.324-51.473l38.849-64.668c14.509-23.2 21.803-57.282 0-79.129l-39.588-39.547c-10.662-10.708-24.994-15.206-39.461-15.206-14.985 0-30.151 4.895-41.465 12.759l-62.972 40.112c-16.343-8.477-33.384-15.731-51.125-21.499l-16.121-72.621c-4.806-26.654-28.1-55.492-58.989-55.492l-55.932 0c-30.897 0-49.815 29.276-55.932 55.93l-17.963 71.746c-18.917 6.03-37.143 13.761-54.445 22.897l-64.538-41.075c-11.361-7.865-26.481-12.759-41.512-12.759-14.42 0-28.752 4.497-39.46 15.206l-39.543 39.547c-21.848 21.846-14.507 55.93 0 79.128l40.854 68.078c-7.644 15.469-14.461 31.374-19.705 48.064l-71.75 15.946c-26.654 4.812-55.495 28.099-55.495 58.995l0 55.93c0 30.889 29.277 49.813 55.932 55.93l72.665 18.13c5.029 15.428 11.273 30.237 18.4 44.569l-40.899 68.165c-14.508 23.157-21.807 57.24 0 79.087l39.588 39.548c10.663 10.704 24.994 15.248 39.455 15.248 14.991 0 30.151-4.894 41.471-12.758l64.672-41.249c17.432 9.217 35.744 17.041 54.795 23.071l17.917 71.573c6.118 26.653 25.035 55.931 55.932 55.931l55.933 0c30.89 0 54.184-28.84 58.989-55.493l16.122-72.838c17.565-5.685 34.433-12.853 50.559-21.194l63.1 40.199c11.313 7.866 26.481 12.76 41.465 12.76 14.467 0 28.8-4.546 39.461-15.248l39.588-39.548c21.803-21.847 14.509-55.93 0-79.089l-38.89-64.757c7.819-15.38 14.596-31.371 20.055-47.976l72.671-18.132c26.655-6.115 55.932-25.039 55.932-55.93l0-55.93C961.354 456.121 932.516 432.833 905.86 428.021zM514.684 648.029c-74.593 0-135.333-60.562-135.333-134.931s60.739-134.889 135.333-134.889c74.588 0 135.287 60.52 135.287 134.889S589.272 648.029 514.684 648.029z" p-id="2223" fill="#ffffff">
            </path>
          </svg>
          <!--<div class="icon icon-setting" @click.stop="dispTagSetting"-->
                <!--@blur.stop="hiddenTagSetting">**</div>-->
          <!--<ul class="setting-info">-->
            <!--<li>-->
              <!--<a href="#" @click.stop="modify">修改文集</a>-->
            <!--</li>-->
            <!--<li>-->
              <!--<a href="#" @click.stop="delete">删除文集</a>-->
            <!--</li>-->
          <!--</ul>-->
        </div>
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
    };
  },
  watch: {
    isDispAddTag(newValue) {
      if (!newValue) {
        this.newTagName = '';
      }
    },
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
    delete() {

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
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
  .tag-setting {
    background: #404040;
    color: #f2f2f2;
    .go-to-blog {
      > a{
        display: inline-block;
        width: 75%;
        border-radius: 20px;
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
        border: 1px solid #308449;
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
        border-left: 2px solid #404040;
        &:hover {
          background: #666;
          cursor: pointer;
        }
        &.active{
          border-left: 2px solid #7f1a1a;
          background: #666;
          color: #ccc;
        }
      }
    }
  }

</style>
