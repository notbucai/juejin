
<template>
  <div class="list">
    <header class="list-header">
      <div class="list-sort left">
        <nuxt-link :to="{query:{...$route.query,sort:'popular'}}" :class="{on:on==0}">热门</nuxt-link>
        <nuxt-link :to="{query:{...$route.query,sort:'newest'}}" :class="{on:on==1}">最新</nuxt-link>
        <nuxt-link :to="{query:{...$route.query,sort:'comment'}}" :class="{on:on==2}">评论</nuxt-link>
      </div>
      <div class="list-sort right">
        <nuxt-link :to="{query:{...$route.query,sort:'weekly_hottest'}}" :class="{on:on==3}">本周最热</nuxt-link>
        <nuxt-link :to="{query:{...$route.query,sort:'monthly_hottest'}}" :class="{on:on==4}">本月最热</nuxt-link>
        <nuxt-link :to="{query:{...$route.query,sort:'hottest'}}" :class="{on:on==5}">历史最热</nuxt-link>
      </div>
    </header>
    <ArticleItem v-for="item in list" :key="item._id" v-bind="item"/>
    <Skeleton01 v-if="!list || !list.length"/>
  </div>
</template>

<script>
import ArticleItem from "@/components/common/listItem/ArticleItem";
import Skeleton01 from "@/components/common/loading/Skeleton01";
export default {
  props: {
    list: Array
  },
  components: {
    ArticleItem,
    Skeleton01
  },
  computed: {
    on() {
      const sort = this.$route.query.sort;
      if (!sort || sort === "popular") {
        return 0;
      } else if (sort === "newest") {
        return 1;
      } else if (sort === "comment") {
        return 2;
      }
      return 0;
    }
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
      &.nuxt-link-exact-active,
      &.on {
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
