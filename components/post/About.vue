<template>
  <div class="about">
    <h4 class="about-title">关于作者</h4>
    <div class="about-main">
      <div class="user-content">
        <img v-if="user.avatar" class="user-avatar" :src="user.avatar" alt>
        <div v-else class="user-avatar" v-html="this.$util.avatars.init(user._id)"></div>
        <main>
          <div class="user-name">{{user.username}}</div>
          <p class="user-info">{{user.bio || '啥也不说，啥也不会'}}</p>
        </main>
      </div>
      <div class="user-o">
        <i class="iconfont">&#xe604;</i>
        <span>获得点赞 {{user.likeNum||0}}</span>
        <!-- 暂时不实现 -->
      </div>
      <div class="user-o">
        <i class="iconfont">&#xe634;</i>
        <span>文章被阅读 {{user.lookNum||0}}</span>
        <!-- 暂时不实现 -->
      </div>
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
          lookNum: 0
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  background: #fff;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  @media (max-width: 960px) {
    display: none;
  }
  &-title {
    border-bottom: 1px solid #f0f0f0f0;
    padding: 14px 16px;
    font-size: 14px;
    color: #333;
  }
  &-main {
    padding: 14px 16px;
    .user {
      &-content {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        > main {
          height: 38px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
      &-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      &-name {
        font-size: 16px;
        font-weight: bold;
      }
      &-info {
        font-size: 14px;
        color: #888;
      }
      &-o {
        margin-bottom: 10px;
        .iconfont {
          font-size: 16px;
          width: 28px;
          height: 28px;
          line-height: 30px;
          text-align: center;
          display: inline-block;
          color: rgb(123, 185, 255);
          background-color: rgb(225, 239, 255);
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
