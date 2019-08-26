<template>
  <div class="user" @click.stop="handleClickShow">
    <nuxt-link to="/xxs" class="msg">
      <i class="iconfont">&#xe98a;</i>
    </nuxt-link>
    <div class="avatar">
      <img
        src="https://mirror-gold-cdn.xitu.io/16a21359c366c2cda5c?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
      />
    </div>
    <transition :duration="200" name="nav-menu">
      <ul class="nav-menu" v-if="isshow">
        <div class="nav-menu-item-group">
          <li class="nav-menu-item">
            <nuxt-link to="/">
              <i class="iconfont">&#xe630;</i>
              <span>写文章</span>
            </nuxt-link>
          </li>
        </div>
        <div class="nav-menu-item-group">
          <li class="nav-menu-item">
            <nuxt-link to="/">
              <i class="iconfont">&#xe601;</i>
              <span>我的主页</span>
            </nuxt-link>
          </li>
          <li class="nav-menu-item">
            <nuxt-link to="/">
              <i class="iconfont">&#xe604;</i>
              <span>我赞过的</span>
            </nuxt-link>
          </li>
          <li class="nav-menu-item">
            <nuxt-link to="/">
              <i class="iconfont">&#xe625;</i>
              <span>我的收藏集</span>
            </nuxt-link>
          </li>
          <li class="nav-menu-item">
            <nuxt-link to="/">
              <i class="iconfont">&#xe60a;</i>
              <span>已购</span>
            </nuxt-link>
          </li>
          <li class="nav-menu-item">
            <nuxt-link to="/">
              <i class="iconfont">&#xe600;</i>
              <span>标签管理</span>
            </nuxt-link>
          </li>
        </div>
        <div class="nav-menu-item-group">
          <li class="nav-menu-item">
            <nuxt-link to="/">
              <i class="iconfont">&#xe603;</i>
              <span>设置</span>
            </nuxt-link>
          </li>
          <li class="nav-menu-item">
            <nuxt-link to="/">
              <i class="iconfont">&#xe602;</i>
              <span>关于</span>
            </nuxt-link>
          </li>
        </div>
        <div class="nav-menu-item-group">
          <li class="nav-menu-item item" @click="handleLogout">
            <i class="iconfont">&#xe622;</i>
            <span>登出</span>
          </li>
        </div>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: false
    };
  },
  methods: {
    async handleLogout(){
      await this.$api.user.logout();
      window.location.href = "/";
    },
    handleClickShow(event) {
      this.isshow = true;
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
.user {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
}
.avatar {
  margin-left: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
.msg {
  margin-left: 10px;
  .iconfont {
    color: $fontColor;
    font-size: 20px;
  }
}
.nav-menu {
  position: absolute;
  top: 101%;
  right: 0;
  width: 154px;
  min-height: 100px;
  overflow: hidden;
  box-sizing: border-box;
  background: #fafafa;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(177, 180, 185, 0.45);
  border-radius: 4px;
  &-enter-active,
  &-active {
    transition: opacity 0.4s;
  }
  &-enter, &-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  &-item-group {
    border-bottom: 1px solid #f0f0f0;
    padding: 6px 0;
    &:last-child {
      border: none;
    }
  }
  &-item {
    a,&.item {
      cursor: pointer;
      display: block;
      color: $fontColor;
      padding: 12px 14px;
      font-size: 16px;
      &:hover {
        background-color: #f0f0f0;
        /* color: $fontActiveColor; */
      }
    }
  }
}
</style>
