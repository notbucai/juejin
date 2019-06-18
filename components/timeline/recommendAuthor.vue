<template>
  <AsideBlock title="推荐作者" class="recommed_author">
    <div slot="main">
      <ul>
        <li>
          <AsideUserItem
            v-for="(item, index) in userList"
            :key="index"
            v-bind="item"
          />
        </li>
      </ul>
    </div>
    <nuxt-link slot="footer" to="/" class="author_more">
      <span>查看更多</span>
      <i class="iconfont">&#xe62e;</i>
    </nuxt-link>
  </AsideBlock>
</template>

<script>
import AsideBlock from "@/components/timeline/AsideBlock.vue";
import AsideUserItem from "@/components/common/listItem/AsideUserItem.vue";

export default {
  props: {
    userList: Array
  },
  components: {
    AsideBlock,
    AsideUserItem
  }
};
</script>
<style lang="scss" scoped>
.recommed_author {
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  .author_more {
    color: $fontActiveColor;
    text-align: center;
    display: block;
    padding: 14px 0;
    font-size: 14px;
    .iconfont {
      font-size: 14px;
      margin-left: -4px;
    }
  }
}
</style>
