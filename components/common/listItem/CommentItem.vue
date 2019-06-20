<template>
  <div class="comment">
    <!-- comment-list -->
    <div class="comment-avatar">
      <nuxt-link :to="`/user/${user._id}`">
        <img v-if="user.avatar" :src="user.avatar" alt="avatar">
        <div v-else v-html="this.$util.avatars.init(user._id)"></div>
      </nuxt-link>
    </div>
    <div class="comment-main">
      <div class="comment-one">
        <div class="comment-user">
          <nuxt-link class="comment-user-name" :to="`/user/${user._id}`">{{user.username}}</nuxt-link>
          <!-- <span>细节</span> -->
        </div>

        <div class="comment-content">
          <div v-if="reply_user" class="reply_user">
            回复
            <nuxt-link
              class="reply_user-username"
              :to="`/user/${reply_user._id}`"
            >{{reply_user.username}}</nuxt-link>：
          </div>
          <div v-html="content"></div>
        </div>

        <div class="comment-action-box">
          <div class="comment-time">{{moment(date)}}</div>
          <div class="comment-action">
            <span @click="handleLike">
              <i class="iconfont">&#xe604;</i> 1
            </span>
            <span @click="handleReply">
              <i class="iconfont">&#xe606;</i>
              回复
            </span>
          </div>
        </div>
        <slot name="edit" class="comment-bgc"></slot>
      </div>
      <div class="comment-bgc">
        <slot name="comment" class="comment-bgc"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    _id: [String, Number],
    article_id: String,
    user_id: String,
    content: String,
    reply_user: Object,
    reply_user_id: String,
    comment_id: String,
    date: String,
    user: {
      type: Object,
      default() {
        return {
          _id: "",
          username: "",
          avatar: ""
        };
      }
    }
  },
  methods: {
    handleReply() {
      this.$emit("reply");
    },
    handleLike() {
      this.$emit("like");
    },
    moment(date) {
      return this.$util.moment.relativeNow(date);
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  /* display: flex; */
  margin-bottom: 10px;
  position: relative;
  &-avatar {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    overflow: hidden;
    border-radius: 50%;
    white-space: nowrap;
    position: absolute;
    a {
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-main {
    margin-left: 46px;
  }
  &-user {
    font-size: 14px;
    color: #333;
    margin: 2px 0 10px;
    display: flex;
    &-name {
      display: block;
      color: #444;
      margin-right: 8px;
    }
    span {
      color: #888;
    }
  }
  &-content {
    font-size: 14px;
    color: #505050;
    line-height: 1.7;
    display: flex;
    align-items: center;
  }
  .reply_user {
    color: #888;
    font-size: 12px;
    &-username {
      font-size: 12px;
      color: $fontActiveColor;
    }
  }
  &-action-box {
    margin-top: 10px;
    color: #8a9aa9;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  &-action {
    span {
      cursor: pointer;
      margin-left: 10px;
    }
  }
  &-one {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 10px;
    padding: 0 0 10px;
  }
  &-bgc {
    background-color: #fafbfc;
    padding: 10px;
    border-radius: 4px;
    &:empty {
      display: none;
    }
  }
  &-two {
    margin-left: 60px;
  }
}
</style>
