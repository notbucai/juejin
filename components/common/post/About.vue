<template>
  <div class="about">
    <h4 class="about-title">关于作者</h4>
    <div class="about-main">
      <div class="user-content">
        <img
          class="user-avatar"
          src="https://user-gold-cdn.xitu.io/2018/9/11/165c942a34cfc234?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
          alt
        >
        <main>
          <div class="user-name">沭阳</div>
          <p class="user-info">简介</p>
        </main>
      </div>
      <div class="user-o"><i class="iconfont">&#xe604;</i> 获得点赞 520</div>
      <div class="user-o"><i class="iconfont">&#xe634;</i> 文章被阅读 22222</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  background: #fff;
  margin-bottom: 20px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  &-title {
    border-bottom: 1px solid #f0f0f0f0;
    padding: 14px 16px;
    font-size: 14px;
    color: #333;
  }
  &-main {
    padding: 14px 16px;
    .user {
      &-content {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        >main{
          height: 38px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
      &-avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      } 
      &-name {
        font-size: 16px;
        font-weight: bold;
      }
      &-info{
        font-size: 14px;
        color: #888;
      }
      &-o{
        margin-bottom: 10px;
        .iconfont{
          font-size: 16px;
          width: 28px;
          height: 28px;
          line-height: 30px;
          text-align: center;
          display: inline-block;
          color: rgb(123, 185, 255);
          background-color: rgb(225, 239, 255);;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
