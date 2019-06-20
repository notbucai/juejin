<template>
  <div id="toast_warp" v-if="show">
    <div class="toast">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "toast_alert",
  components: {},
  data() {
    return {
      show: false,
      message:""
    };
  },
  methods: {
    handleShow() {
      // document.documentElement.style.overflow = "hidden";
      this.show = true;
    },
    handleHide() {
      // document.documentElement.style.overflow = "inherit";
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
/* #toast_warp {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
} */
#toast_warp {
  position: fixed;
  z-index: 999;
  bottom: 20%;
  width: 100%;
  height: 0;
  text-align: center;
}
.toast {
  color: #444;
  font-size: 14px;
  display: inline-block;
  padding: 8px 20px;
  min-width: 10px;
  min-height: 10px;
  background-color: #fff;
  border-radius: 2px;
  text-align: center;
  box-shadow: 0 0 4px 0px #bdbdbd;
}
</style>
