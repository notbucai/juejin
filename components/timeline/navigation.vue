<template>
  <div class="nav_wrap" :class="{top:istop}" v-scroll="handleScroll">
    <nav class="nav container">
      <nuxt-link to="/timeline/recommended" class="nav-item">推荐</nuxt-link>
      <nuxt-link to="/timeline/following" class="nav-item">关注</nuxt-link>
      <nuxt-link to="/2" class="nav-item">首页</nuxt-link>
      <nuxt-link to="/3" class="nav-item">首页</nuxt-link>
      <nuxt-link to="/6" class="nav-item">首页</nuxt-link>
      <nuxt-link to="/6" class="nav-item">首页</nuxt-link>
      <nuxt-link to="/6" class="nav-item">首页</nuxt-link>
      <nuxt-link to="/6" class="nav-item">首页</nuxt-link>
      <nuxt-link to="/6" class="nav-item">首页</nuxt-link>
      <nuxt-link to="/6" class="nav-item">首页</nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      istop: false,
      topNum: 0
    };
  },
  methods: {
    handleScroll(evt, el) {
      if (window.scrollY > 100) {
        this.istop = true;
      } else {
        this.istop = false;
      }
      if (this.topNum >= 100) {
        // 上滑
        if (this.topNum > window.scrollY) {
          this.istop = false;
        } else if (this.topNum < window.scrollY) {
          // 下滑
          this.istop = true;
        }
      }
      this.topNum = window.scrollY;
    }
  }
};
</script>

<style lang="scss" scoped>
.nav_wrap {
  position: fixed;
  z-index: 19;
  top: 60px;
  left: 0;
  right: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  transition: all 0.4s;
  &.top {
    top: 0;
  }
}
.nav {
  flex-grow: 1;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  overflow-y: auto;
  height: 44px;
  @media screen {
    & &-item {
      &:first-child {
        padding-left: 18px;
      }
    }
  }
  &-item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 14px;
    font-size: 14px;
    color: $fontColor;
    white-space: nowrap;
    &:first-child {
      padding-left: 0;
    }
    &.nuxt-link-exact-active {
      color: $fontActiveColor;
    }
  }
}
</style>
