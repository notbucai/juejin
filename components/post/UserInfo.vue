<template>
  <div class="user">
    <nuxt-link :to="`/user/${user._id}`" class="user-avatar">
      <img v-if="user.avatar" :src="user.avatar" alt="#">
      <div v-else v-html="this.$util.avatars.init(user._id)"></div>
    </nuxt-link>
    <div class="user-main">
      <nuxt-link :to="`/user/${user._id}`" class="name">
        {{user.username}}
        <span>{{user.bio}}</span>
        <!-- 等级暂时不实现 -->
        <!-- <img
          src="https://b-gold-cdn.xitu.io/v3/static/img/lv-2.f597b88.svg"
          alt="lv-2"
        >-->
      </nuxt-link>
      <p class="info">发布了{{user.articleNum}}篇专栏·获得点赞数{{user.likeNum}}·获得阅读{{user.lookNum}}</p>
    </div>
    <div class="user-btn">
      <button class="btn" @click="handleFocus">关注</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {
          _id: "",
          username: "",
          avatar: "",
          bio: "",
          likeNum: 0,
          likeNum: 0,
          articleNum: 0
        };
      }
    }
  },
  mounted() {
    console.log(this.user);
  },
  methods: {
    handleFocus() {
      this.$emit("focus");
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  height: 40px;
  /* box-sizing: border-box; */
  padding: 20px 0;
  &-avatar {
    margin-right: 10px;
    > img,
    > div {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  &-main {
    height: 96%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      display: block;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      > span {
        font-size: 14px;
        color: #888;
        font-weight: normal;
      }
    }
    .info {
      color: #999;
      font-size: 14px;
    }
  }
  &-btn {
    .btn {
      display: flex;
      padding: 6px 10px;
      color: #6cbd45;
      font-size: 12px;
      border: 1px solid #6cbd45;
    }
  }
}
</style>
