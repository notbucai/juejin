<template>
  <div class="auth">
    <span class="auth-item auth-login" @click="handleClick(1)">登陆</span>
    <span class="auth-item auth-register" @click="handleClick(2)">注册</span>
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
    handleClick(option) {
      this.$emit("click", option);
    }
  }
};
</script>

<style lang="scss" scoped>
.auth {
  font-size: 14px;
  margin-left: 10px;
  &-item {
    color: $fontActiveColor;
    cursor: pointer;
    position: relative;
  }
  &-login {
    margin-right: 10px;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -8px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: $fontActiveColor;
    }
  }
}
</style>
