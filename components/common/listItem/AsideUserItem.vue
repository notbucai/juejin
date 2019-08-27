<template>
  <nuxt-link class="user_item" :to="`/user/${_id}`">
    <div class="user-aratar">
      <img v-if="aratar" :src="aratar" :alt="username">
      <div v-else v-html="$util.avatars.init(_id)"></div>
    </div>
    <div class="user-info">
      <div class="username">{{username}}</div>
      <div class="position">{{position || "无"}}</div>
      <div class="description">{{description || "无"}}</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    _id: [String, Number],
    aratar: String,
    username: String,
    position: String,
    description: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.user_item {
  padding: 14px 15px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  .user {
    &-aratar {
      width: 46px;
      min-width: 46px;
      height: 46px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-info {
      flex-grow: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      .username {
        font-size: 14px;
        color: #333;
      }
      .description,
      .position {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $fontColor;
        font-size: 12px;
      }
    }
  }
}
</style>
