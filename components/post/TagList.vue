<template>
  <div class="tag">
    <p class="title">关注下面的标签，发现更多相似文章</p>
    <nuxt-link class="item" :to="`/tag/${item._id}`" tag="div" v-for="(item, index) in tags" :key="index">
      <img
        :src="require('@/assets/img/avatar.jpeg')"
        alt
      >
      <span>{{item.title}}</span>
    </nuxt-link>
  </div>
</template>

<script>
/*
"_id": "5cc545ee7ba5d016b5d0c2fa",
"title": "机器学习",
"nav_id": "5cc3d70c43672207893205af",
"__v": 0
*/
export default {
  props: {
    tags: Array
  }
};
</script>

<style lang="scss" scoped>
.tag {
  margin: 20px 0 10px;
  .title {
    font-size: 16px;
    font-weight: bold;
    padding-left: 30px;
    line-height: 30px;
    border-left: 6px solid #eee;
  }
  .item {
    overflow: hidden;
    border: 1px solid #eee;
    display: inline-block;
    padding: 4px 4px;
    padding-right: 12px;
    line-height: 20px;
    margin: 15px 0;
    margin-right: 20px;
    > img {
      width: 20px;
      float: left;
      margin-right: 4px;
    }
    > span {
      float: left;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
