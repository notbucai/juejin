<template>
  <div class="wordNew">
    <!-- 没有登陆时 -->
    <nuxt-link to="/edit" v-if="isStat">
      <div class="warp warp-no" :class="{'warp-yes': isStat}">
        <i class="iconfont">&#xe605;</i>
        写文章
      </div>
    </nuxt-link>

    <!-- TODO: 以下功能放弃 -->
    <!-- 未登陆时弹出层 -->
    <!-- 登陆时 -->
    <div class="warp warp-yes" v-else @click="handleClick()">写文章</div>
  </div>
</template>

<script>
export default {
  props: {
    isStat: Boolean
  },
  methods: {
    handleClick() {
      this.$emit("click", 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.wordNew {
  margin-left: 20px;
  position: relative;
  @media (max-width: 980px) {
    display: none;
  }
  .warp {
    cursor: pointer;
    padding: 8px 10px;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    .iconfont {
      font-size: 16px;
      font-weight: bold;
    }
    &-no {
      color: $fontActiveColor;
    }
    &-yes {
      background-color: $fontActiveColor;
      color: #fff;
    }
  }
}
</style>

