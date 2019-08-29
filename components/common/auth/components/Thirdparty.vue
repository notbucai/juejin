<template>
  <div class="thirdparty">
    <p class="info">第三方登陆</p>
    <div class="list">
      <div class="bg" @click="open('/api/auth/github')">
        <img src="@/assets/img/github.svg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    open(url) {
      const tip = window.open(
        url,
        "login",
        "height=600, width=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
      );
      setInterval(() => {
        if (tip.closed) {
          window.location.reload();
        }
        console.log(tip.closed);
      }, 300);
    }
  }
};
</script>

<style lang="scss" scope>
.thirdparty {
  width: 100%;
  .info {
    font-size: 14px;
    color: #888;
  }
  .list {
    display: flex;
    justify-content: center;
    align-items: center;
    .bg {
      width: 40px;
      height: 40px;
      background-color: #f0f0f0f0;
      padding: 8px;
      text-align: center;
      box-sizing: border-box;
      border-radius: 50%;
      cursor: pointer;
      > img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>