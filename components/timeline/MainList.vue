
<template>
  <div class="list">
    <header class="list-header">
      <div class="list-sort left">
        <nuxt-link :to="{query:{...$route.query,sort:'popular'}}">热门</nuxt-link>
        <nuxt-link :to="{query:{...$route.query,sort:'newest'}}">最新</nuxt-link>
        <nuxt-link :to="{query:{...$route.query,sort:'comment'}}">评论</nuxt-link>
      </div>
      <div class="list-sort right">
        <nuxt-link :to="{query:{...$route.query,sort:'weekly_hottest'}}">本周最热</nuxt-link>
        <nuxt-link :to="{query:{...$route.query,sort:'monthly_hottest'}}">本月最热</nuxt-link>
        <nuxt-link :to="{query:{...$route.query,sort:'hottest'}}">历史最热</nuxt-link>
      </div>
    </header>
    <ArticleItem/>
    <ArticleItem/>
    <ArticleItem/>
  </div>
</template>

<script>
import ArticleItem from "@/components/common/listItem/ArticleItem";
export default {
  components: {
    ArticleItem
  }
};
</script>

<style lang="scss" scoped>
.list {
  &-header {
    border-bottom: 1px solid #f2f2f2;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-sort {
    padding: 0 15px;
    font-size: 14px;
    > a {
      color: $fontColor;
      position: relative;
      padding-right: 12px;
      &:hover,
      &.nuxt-link-exact-active {
        color: $fontActiveColor;
      }
    }
    &.left {
      > a {
        &:not(:last-child)::after {
          position: absolute;
          top: 20%;
          right: 4px;
          /* margin-top: -1px; */
          content: "";
          width: 1px;
          height: 60%;
          background-color: rgba($fontColor, 0.6);
        }
      }
    }
    &.right {
      @media (max-width: 700px) {
        display: none;
      }
      > a {
        &:not(:last-child)::after {
          position: absolute;
          top: 50%;
          right: 4px;
          margin-top: -1px;
          content: "";
          width: 2px;
          height: 2px;
          background-color: rgba($fontColor, 0.6);
        }
      }
    }
  }
}
</style>
