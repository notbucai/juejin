<template>
  <div class="repass">
    <h1>重置密码</h1>
    <main class="repass-main">
      <form action="#" method="post" class="auth_form" @submit.prevent="handleSubmit">
        <div class="form-item">
          <input
            type="text"
            :class="{error:verify.phone}"
            v-model="formData.userphone"
            placeholder="请输入手机号"
          />
        </div>

        <div class="form-item">
          <input
            type="text"
            :class="{error:verify.code}"
            v-model="formData.code"
            placeholder="请输入验证码"
            maxlength="6"
          />
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
          />
        </div>
        <div class="form-item">
          <button type="submit" :disabled="submiting">{{submiting?'重置中':'确定'}}</button>
        </div>
        <div class="form-item center">
          <nuxt-link to="/">回到首页</nuxt-link>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  layout: "clean",
  head() {
    return {
      title: "重置密码"
    };
  },
  data() {
    return {
      submiting: false,
      formData: {userphone: "", userpass: "", code: "" },
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
    "formData.userpass"() {
      this.verify.pass = false;
    },
    "formData.code"() {
      this.verify.code = false;
    }
  },
  methods: {
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
    async handleRegisterSubmit(formData) {
      try {
        const res = await this.$api.user.repass(formData);
        this.$alert.toast({ message: "重置成功，请重新登陆" });
        this.$router.push('/');
      } catch (error) {
        console.log(error);
        const { message } = error.data || error;
        this.$alert.toast({
          message: error.message || (error.data && error.data.message)
        });
      }
    },
    async handleSubmit() {
      
      // TODO 验证
      if (this.submiting) {
        return;
      }
      this.submiting = true;

      const { userphone, userpass, code } = this.formData;

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
      await this.handleRegisterSubmit(this.formData);
      setTimeout(() => {
        this.submiting = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scope>
.repass {
  width: 400px;
  min-height: 200px;
  margin: 10vh auto;
  background-color: #fff;
  box-shadow: 0 0 10px #f0f0f0;
  padding:60px 40px;
  box-sizing: border-box;
  @media (max-width: 900px) {
    width: 100%;
  }
  > h1 {
    font-size: 26px;
    font-weight: bold;
    text-align: center;
  }
  &-main {
    margin-top: 30px;
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
    margin-bottom: 20px;
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