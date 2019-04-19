<template>
  <AsideBlock title="推荐作者" class="recommed_author">
    <div slot="main">
      <ul>
        <li>
          <AsideUserItem
            v-bind="{id:'12312',aratar:'https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',username:'不才',position:'123',description:'adsfasdfasdf'}"
          />
          <AsideUserItem
            v-bind="{id:'12312',aratar:'https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',username:'不才',position:'123',description:'adsfasdfasdf'}"
          />
          <AsideUserItem
            v-bind="{id:'12312',aratar:'https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',username:'不才',position:'123',description:'adsfasdfasdf'}"
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
