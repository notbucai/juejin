<template>
  <div id="headerWrap">
    <header class="head" :class="{visible:isvisible}" v-scroll="handleScroll">
      <div class="container">
        <!-- logo -->
        <nuxt-link to="/" class="logo">
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt />
        </nuxt-link>
        <!-- 导航 -->
        <Navigation :navs="navs" />
        <!-- 右边 -->
        <div class="other">
          <!-- 搜索 -->
          <Search />
          <!-- 写文章按钮 -->
          <WordNew :isStat="!!user" @click="handleClick" />
          <!-- 消息 -->
          <nuxt-link to="/xxs" class="msg">
            <i class="iconfont">&#xe98a;</i>
          </nuxt-link>
          <!-- 用户相关 -->
          <User :user="user" v-if="user" />
          <Auth v-else @click="handleClick" />
        </div>
      </div>
    </header>
    <!-- 登陆注册组件 -->
    <Login v-if="current_show_auth === 1" @close="handleClick(0)" @switch="handleClick" />
    <Register v-if="current_show_auth === 2" @close="handleClick(0)" @switch="handleClick" />
  </div>
</template>

<script>
import User from "./user";
import WordNew from "./wordNew";
import Navigation from "./navigation";
import Search from "./search";
import Auth from "./auth";

import Login from "../auth/Login.vue";
import Register from "../auth/Register";

import { mapState, mapActions } from "vuex";
export default {
  name: "jjhead",
  props: {
    navs: Array
  },
  components: {
    User,
    WordNew,
    Navigation,
    Search,
    Auth,
    Login,
    Register
  },
  computed: {
    ...mapState(["current_show_auth", "user"])
  },
  data() {
    return {
      isvisible: true,
      topNum: 0
    };
  },
  methods: {
    ...mapActions(["change_current_show_auth", "login"]),
    handleClick(stat) {
      this.change_current_show_auth(stat);
    },
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
.msg {
  margin-left: 10px;
  .iconfont {
    color: $fontColor;
    font-size: 20px;
  }
}
</style>
