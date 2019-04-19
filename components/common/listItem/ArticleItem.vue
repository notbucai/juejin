<template>
  <nuxt-link to="/" class="item" tag="div">
    <main class="item-main">
      <div class="info">
        <span class="info-item hot">热</span>
        <span class="info-item post">专栏</span>
        <span class="info-item username">
          <nuxt-link to="/">不才</nuxt-link>
        </span>
        <span class="info-item">4小时前</span>
        <span class="info-item tag">
          <nuxt-link to="/">微信</nuxt-link>
          <span>/</span>
          <nuxt-link to="/">JavaScript</nuxt-link>
        </span>
      </div>
      <div class="title">
        <nuxt-link to="/">微信小程序看今天支持svg了</nuxt-link>
      </div>
      <div class="action">
        <div class="action-item">
          <i class="iconfont">&#xe604;</i>
          <span>123</span>
        </div>
        <div class="action-item">
          <i class="iconfont">&#xe606;</i>
          <span>123</span>
        </div>
      </div>
    </main>
    <div class="item-img">
      <img
        src="https://user-gold-cdn.xitu.io/2018/10/23/166a0387b91066b9?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1"
      >
    </div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: all 0.6s;
  border-bottom: 1px solid #f2f2f2;
  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }
  &-main {
    flex-grow: 1;
  }
  &-img {
    min-width: 60px;
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    &-item {
      font-size: 12px;
      color: $fontColor;
      position: relative;
      margin-right: 6px;
      &:not(:last-child)::after {
        content: "";
        position: absolute;
        top: 50%;
        right: -6px;
        margin-top: -1px;
        width: 2px;
        height: 2px;
        background-color: $fontColor;
      }
      a {
        color: $fontColor;
        &:hover {
          color: $fontActiveColor;
        }
      }

      &.hot,
      &.post {
        font-weight: 500;
        color: red;
      }
      &.post {
        color: #b71ed7;
      }
      &.username {
        position: relative;
      }
      &.tag {
      }
    }
  }
  .title {
    margin: 8px 0 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    a {
      font-weight: 600;
      line-height: 1.2;
      font-size: 17px;
      color: #2e3135;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .action {
    display: flex;
    border: 1px solid #f0f0f0;
    width: max-content;
    border-radius: 2px;
    &-item {
      display: flex;
      align-items: center;
      height: 24px;
      padding: 0 8px;
      color: #ccc;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      &:not(:last-child) {
        border-right: 1px solid #f0f0f0;
      }
      &:hover {
        background-color: #fafefe;
      }
      span {
        padding: 0 4px;
      }
    }
  }
}
</style>
