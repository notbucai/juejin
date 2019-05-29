<template>
  <div class="edit-box" v-show="isyes || (content || content.length)">
    <div class="avatar-box">
      <img :src="user.avatar || require('@/assets/img/avatar.jpeg')" alt="avatar">
    </div>
    <div class="form-box">
      <div class="input-box">
        <div
          class="rich-input"
          contenteditable="true"
          :autofocus="isyes"
          spellcheck="false"
          placeholder="请输入"
          :class="{empty:!content||!content.length}"
          @input="handleInput"
          @focus="isShow = true"
          @blur="isShow = false"
          auto
        ></div>
      </div>
      <transition name="fade">
        <div class="action-box" v-show="isShow || (content || content.length)">
          <!-- TODO 表情暂定 -->
          <div class="submit">
            <button
              class="btn"
              :class="{empty:!content || !content.length}"
              @click="handleSubmit"
            >评论</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isyes: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default() {
        return {
          avatar: String
        };
      }
    }
  },
  data() {
    return {
      isShow: false,
      content: ""
    };
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.$emit("focus");
      } else {
        this.$emit("blur");
      }
    }
  },
  methods: {
    handleInput(e) {
      this.content = e.target.innerHTML;
    },
    handleSubmit() {
      this.$emit("btnClick", this.content);
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-box {
  background-color: #f9f9f9f9;
  padding: 10px 15px;
  border-radius: 4px;
  display: flex;
  margin: 10px 0;
  overflow: hidden;
  .avatar-box {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .form-box {
    flex-grow: 1;
    .input-box {
      width: 100%;
      height: auto;
      .rich-input {
        color: #333;
        outline: none;
        padding: 8px 10px;
        background-color: #fff;
        /* min-height: 30px; */
        box-sizing: border-box;
        line-height: 1.7;
        font-size: 14px;
        max-width: 100%;
        border: 1px solid $fontActiveColor;
        border-radius: 4px;
        position: relative;
        &.empty {
          &::after {
            content: "请输入评论...";
            display: block;
            position: absolute;
            left: 10px;
            top: 0;
            height: 100%;
            align-items: center;
            display: flex;
            color: #999;
          }
        }
      }
    }
  }
  .action-box {
    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.3s;
    }
    &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    display: flex;
    margin-top: 10px;
    .submit {
      margin-left: auto;
      .btn {
        cursor: pointer;
        margin-left: auto;
        padding: 7px 18px;
        color: #fff;
        background-color: #027fff;
        border-radius: 2px;
        font-size: 14px;
        border: none;
        outline: none;
        &:hover {
          background-color: #0069d3;
        }
        &.empty {
          cursor: default;
          opacity: 0.4;
          &:hover {
            background-color: #027fff;
            /* background-color: #0069d3; */
          }
        }
      }
    }
  }
}
</style>

