<template>
  <div class="nav_wrap">
    <nav class="nav container">
      <nuxt-link
        :to="{query:{...$route.query,tab:item.title}}"
        class="nav-item"
        v-for="item in showList"
        :key="item.id"
      >{{item.title}}</nuxt-link>
      <span class="nav-item" v-if="!isAll && list && list.length>1" @click="isAll=true">
        展开
        <i class="iconfont">&#xe608;</i>
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    url: String
  },
  data() {
    return {
      isAll: false
    };
  },
  computed: {
    showList() {
      if (this.list.length <= 0) {
        this.isAll = true;
      }
      return this.isAll ? this.list : this.list.slice(0, 10);
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.nav_wrap {
  /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); */
  /* background-color: #fff; */
  transition: all 0.4s;
}
.nav {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media (max-width: 960px) {
    padding: 0 14px;
    & &-item {
      &:first-child {
        /* padding-left: 18px; */
      }
    }
  }
  &-item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 6px 14px;
    font-size: 12px;
    color: $fontColor/0.9;
    white-space: nowrap;
    background-color: #fff;
    border-radius: 16px;
    box-sizing: border-box;
    margin-right: 10px;
    transition: all 0.2s;
    margin-bottom: 14px;
    cursor: pointer;
    &:hover {
      color: $fontActiveColor;
    }
    &.on,
    &.nuxt-link-exact-active {
      color: #fff;
      background-color: $fontActiveColor;
    }
    &:first-child {
      /* padding-left: 0; */
    }
  }
}
</style>
