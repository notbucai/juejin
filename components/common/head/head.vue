<template>
  <div id="headerWrap">
    <header class="head" :class="{visible:isvisible}" v-scroll="handleScroll">
      <div class="container">
        <!-- logo -->
        <nuxt-link to="/" class="logo">
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt>
        </nuxt-link>
        <!-- 导航 -->
        <Navigation/>
        <!-- 右边 -->
        <div class="other">
          <!-- 搜索 -->
          <Search/>
          <!-- 写文章按钮 -->
          <WordNew/>
          <!-- 用户相关 -->
          <User/>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import User from "./user";
import WordNew from "./wordNew";
import Navigation from "./navigation";
import Search from "./search";
export default {
  name: "jjhead",
  components: {
    User,
    WordNew,
    Navigation,
    Search
  },
  data() {
    return {
      isvisible: true,
      topNum: 0
    };
  },
  methods: {
    handleScroll(evt, el) {
      if (window.scrollY > 100) {
        this.isvisible = false;
      } else {
        this.isvisible = true;
      }

      if (this.topNum >= 100) {
        // 上滑
        if (this.topNum > window.scrollY) {
          this.isvisible = true;
        } else if (this.topNum < window.scrollY) {
          // 下滑
          this.isvisible = false;
        }
      }
      this.topNum = window.scrollY;
    }
  }
};
</script>

<style lang="scss" scoped>
#headerWrap {
  width: 100%;
  height: 60px;
  .head {
    position: fixed;
    z-index: 20;
    top: 0;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #f9f9f9;
    background-color: #fff;
    color: $fontColor;
    transform: translate3d(0, -100%, 0);
    transition: all 0.4s;
    &.visible {
      transform: translate3d(0, 0%, 0);
    }
  }

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 960px) {
      width: 96%;
    }
  }
}
.logo {
  margin-right: 2%;
  overflow: hidden;
  box-sizing: border-box;
  img {
    height: 100%;
  }
  @media (max-width: 700px) {
    width: 36px;
    height: 36px;
    margin-left: 1%;
  }
}

.other {
  display: flex;
  height: 100%;
  align-items: center;
}
</style>
