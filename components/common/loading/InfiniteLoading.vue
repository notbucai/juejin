<template>
  <div v-scroll="handleInfiniteLoading"></div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.addEventListen();
  },
  methods: {
    addEventListen() {
      if (this.addEventListen.added) {
        return;
      }
      window.removeEventListener("scroll", this.handleInfiniteLoading);
      window.addEventListener("scroll", this.handleInfiniteLoading);
      this.addEventListen.added = true;
    },

    async handleInfiniteLoading() {
      if (this.loading) {
        return;
      }

      const currentHeight =
        document.documentElement.scrollTop + window.innerHeight;
      const TotalHeight = document.documentElement.scrollHeight;

      if (TotalHeight - currentHeight < 30) {
        this.loading = true;
        console.log("开始加载");

        await this.$emit('onInfiniteLoading');
        
        // 加载完成
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
