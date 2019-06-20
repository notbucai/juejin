<template>
  <div id="authWrap">
    <div class="auth_main">
      <div class="iconfont auth_close" @click="handleClose">&#xea13;</div>
      <div class="auth_stat">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" alt="show">
      </div>
      <form action="#" method="post" class="auth_form" @submit.prevent="handleSubmit">
        <div class="form-title">登录</div>
        <div class="form-item">
          <input
            type="text"
            :class="{error:verify.name}"
            v-model="formData.loginName"
            placeholder="请输入手机号或用户名"
          >
        </div>
        <div class="form-item">
          <input
            type="password"
            :class="{error:verify.pass}"
            v-model="formData.loginPass"
            placeholder="请输入密码"
          >
        </div>
        <div class="form-item">
          <button :disabled="submiting">{{submiting?'登录中':'登录'}}</button>
        </div>
        <div class="form-item">
          <span class="form-left">
            没有账号？
            <span class="form-action" @click="$emit('switch',2)">注册</span>
          </span>
          <span class="form-right">
            <a href="/reset-password">
              <span class="form-action">忘记密码</span>
            </a>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "jjlogin",
  props: {},
  components: {},
  data() {
    return {
      submiting: false,
      formData: { loginName: "", loginPass: "" },
      verify: {
        name: false,
        pass: false
      }
    };
  },
  watch: {
    "formData.loginName"() {
      this.verify.name = false;
    },
    "formData.loginPass"() {
      this.verify.pass = false;
    }
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    async handleSubmit() {
      // TODO 验证
      if (this.submiting) {
        return;
      }
      this.submiting = true;

      const { loginName, loginPass } = this.formData;

      if (!loginName) {
        this.verify.name = true;
        this.submiting = false;
        return;
      }
      if (!loginPass) {
        this.verify.pass = true;
        this.submiting = false;
        return;
      }
      this.$emit("submit", this.formData);
      setTimeout(() => {
        this.submiting = false;
      }, 500);

    }
  }
};
</script>

<style lang="scss" scoped>
#authWrap {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.auth {
  &_close {
    position: absolute;
    right: 24px;
    top: 26px;
    font-size: 12px;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
    color: #888;
    transition: all 0.5s;
    &:hover {
      color: #333;
    }
  }
  &_stat {
    position: absolute;
    top: -80px;
    left: 50%;
    width: 120px;
    height: 100px;
    transform: translate(-50%, 0);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &_main {
    width: 280px;
    /* height: 300px; */
    margin: auto;
    padding: 26px 24px;
    background-color: #fff;
    border-radius: 2px;
    position: relative;
  }
  &_form {
  }
}

.form {
  &-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  &-action {
    color: $fontActiveColor;
    user-select: none;
    cursor: pointer;
  }
  &-left,
  &-right {
    font-size: 14px;
  }
  &-left {
    float: left;
    color: #888;
  }
  &-right {
    float: right;
  }
  &-item {
    margin-bottom: 13px;
    width: 100%;
    button,
    input {
      width: 100%;
      height: 40px;
      display: block;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 14px;
      border-radius: 2px;
      border: none;
    }
    input {
      color: #333;
      border: 1px solid #f0f0f0;
      transition: all 0.3s;
      &.error {
        border-color: $colorRed;
      }
      &:focus {
        border-color: $fontActiveColor;
      }
    }
    button {
      background-color: $fontActiveColor;
      color: #fff;
      cursor: pointer;
      transition: all 0.2;
      &:disabled {
        background-color: rgb(161, 161, 161);
      }
    }
  }
}
</style>
