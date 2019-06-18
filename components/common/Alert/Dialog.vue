<template>
  <div id="dialog_warp">123</div>
</template>

<script>
export default {
  name: "dialog",
  components: {},
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleShow() {
      this.show = true;
      setTimeout(() => {
        this.handleHide();
      }, 1000);
    },
    handleHide() {
      this.show = false;
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
