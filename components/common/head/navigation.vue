<template>
  <nav class="nav">
    <span class="nav-curr" :class="{'active':isshow}" @click.stop="handleClickShow">
      首页
      <i class="iconfont">&#xe608;</i>
    </span>
    <ul class="nav-list" :class="{'show':isshow}">
      <nuxt-link
        :to="item.url"
        class="nav-item"
        v-for="(item) in navs"
        :key="item.url"
      >{{item.name}}</nuxt-link>
    </ul>
  </nav>
</template>

<script>
export default {
  props: { navs: Array },
  data() {
    return {
      isshow: false
    };
  },
  methods: {
    handleClickShow(event) {
      this.isshow = !this.isshow;
      document.addEventListener("click", this.handleClickHide);
    },
    handleClickHide(event) {
      this.isshow = false;
      document.removeEventListener("click", this.handleClickHide);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  flex-grow: 1;
  display: flex;
  height: 100%;
  position: relative;

  @media (max-width: 960px) {
    flex-direction: column;
    background-color: #fff;

    & &-item {
      height: 48px;
    }
    & &-curr {
      display: flex;
    }
    & &-list {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 101%;
      background: #fff;
      overflow: hidden;
      height: auto;
      border: 1px solid #ccc;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(177, 180, 185, 0.45);
      border-radius: 4px;
      &.show {
        display: block;
      }
    }
  }
  &-list {
    display: flex;
    height: 100%;
    align-items: center;
  }
  &-item,
  &-curr {
    display: flex;
    align-items: center;
    padding: 0 18px;
    height: 100%;
    color: $fontColor;
    &.nuxt-link-exact-active,
    &:hover {
      color: $fontActiveColor;
    }
  }
  &-curr {
    color: $fontActiveColor;
    display: none;
    text-align: center;
    &.active {
      > .iconfont {
        transform: rotate(180deg);
      }
    }
    > .iconfont {
      transition: all 0.4s;
      transform: rotate(0deg);
    }
  }
}
</style>
