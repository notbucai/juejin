<template>
  <div id="authWrap">
    <div class="auth_main">
      <div class="iconfont auth_close" @click="handleClose">&#xea13;</div>
      <form action="#" method="post" class="auth_form" @submit.prevent="handleSubmit">
        <div class="form-title">注册</div>
        <div class="form-item">
          <input
            type="text"
            :class="{error:verify.name}"
            v-model="formData.username"
            placeholder="请输入用户名"
          >
        </div>
        <div class="form-item">
          <input
            type="text"
            :class="{error:verify.phone}"
            v-model="formData.userphone"
            placeholder="请输入手机号"
          >
        </div>

        <div class="form-item" v-show="isphone">
          <input
            type="text"
            :class="{error:verify.code}"
            v-model="formData.code"
            placeholder="请输入验证码"
            maxlength="6"
          >
          <span class="form-right position">
            <span class="form-action" @click="handleGetCode">{{codeText}}</span>
          </span>
        </div>
        <div class="form-item">
          <input
            type="password"
            :class="{error:verify.pass}"
            v-model="formData.userpass"
            placeholder="请输入密码"
          >
        </div>
        <div class="form-item">
          <button :disabled="submiting">{{submiting?'注册中':'注册'}}</button>
        </div>
        <div class="form-item center">
          <span class="form-action" @click="$emit('switch',1)">已有账号登陆</span>
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
      formData: { username: "", userphone: "", userpass: "", code: "" },
      isphone: false,
      verify: {
        name: false,
        pass: false,
        phone: false,
        code: false
      },
      codeText: "获取验证码",
      codeing: false
    };
  },
  watch: {
    "formData.username"() {
      this.verify.name = false;
    },
    "formData.userphone"() {
      this.verify.phone = false;

      if (/^1[3456789]\d{9}$/.test(this.formData.userphone)) {
        this.isphone = true;
      } else {
        this.isphone = false;
      }
    },
    "formData.userpass"() {
      this.verify.pass = false;
    },
    "formData.code"() {
      this.verify.code = false;
    }
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    async handleGetCode() {
      // 判断手机号是否正确

      if (!/^1[3456789]\d{9}$/.test(this.formData.userphone)) {
        this.verify.phone = true;
        return;
      }
      // 判断是否正在等待
      if (this.codeing) {
        return;
      }
      this.codeing = true;
      // 发送请求
      try {
        const res = await this.$api.common.code(this.formData.userphone);
        this.$alert.toast({ message: "获取成功" });

        // 如果 存在指定字段 说明是测试阶段
        if (res._v) {
          this.formData.code = res._v.code;
        }
        // 得到响应
        // 开始倒计时 禁止点击
        let codeIndex = 60;
        this.codeText = codeIndex;
        const timer = setInterval(() => {
          codeIndex--;
          this.codeText = codeIndex;
          if (codeIndex <= 0) {
            clearInterval(timer);
            this.codeing = false;
            this.codeText = "重新获取";
          }
        }, 1000);
      } catch (error) {
        this.codeing = false;
        const { message } = error.data || error;
        this.$alert.toast({ message: message });
      }
      // 提示用户
      // 计时停止 允许点击
    },
    async handleSubmit() {
      // TODO 验证
      if (this.submiting) {
        return;
      }
      this.submiting = true;

      const { username, userphone, userpass, code } = this.formData;
      console.log(username, userphone, userpass, code);

      if (!username) {
        this.verify.name = true;
        this.submiting = false;
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.formData.userphone)) {
        this.verify.phone = true;
        this.submiting = false;
        return;
      }

      if (!code || (String(code).length !== 4 && String(code).length !== 6)) {
        this.verify.code = true;
        this.submiting = false;
        return;
      }
      if (!userpass) {
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
    font-size: 14px;
  }
  &-left,
  &-right {
    font-size: 14px;
    &.position {
      position: absolute;
      top: 0;
      right: 10px;
      line-height: 40px;
    }
  }

  &-left {
    float: left;
    color: #888;
  }
  &-right {
    float: right;
  }
  &-item {
    position: relative;
    margin-bottom: 13px;
    width: 100%;
    &.center {
      text-align: center;
    }
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
