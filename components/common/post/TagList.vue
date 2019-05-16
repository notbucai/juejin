<template>
  <div class="tag">
    <p class="title">关注下面的标签，发现更多相似文章</p>
    <div class="item">
      <img src="https://lc-gold-cdn.xitu.io/bac28828a49181c34110.png?imageView2/2/w/42/h/42/q/85/format/webp/interlace/1" alt="">
      <span>前端</span>
    </div>
    <div class="item">
      <img src="https://lc-gold-cdn.xitu.io/bac28828a49181c34110.png?imageView2/2/w/42/h/42/q/85/format/webp/interlace/1" alt="">
      <span>前端</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  margin: 20px 0 10px;
  .title{
    font-size: 16px;
    font-weight:  bold;
    padding-left: 30px;
    line-height: 30px;
    border-left: 6px solid #eee;
  }
  .item{
    overflow: hidden;
    border: 1px solid #eee;
    display: inline-block;
    padding: 4px 4px;
    padding-right: 12px;
    line-height: 20px;
    margin: 15px 0;
    margin-right: 20px;
    >img{
      width: 20px;
      float: left;
      margin-right: 4px;
    }
    >span{
      float: left;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
