<template>
  <section>
    <MainList :list="list"/>
    <InfiniteLoading @onInfiniteLoading="handleInfiniteLoading"/>
  </section>
</template>

<script>
import MainList from "@/components/timeline/MainList";
import InfiniteLoading from "@/components/common/loading/InfiniteLoading";

export default {
  components: { MainList, InfiniteLoading },
  created() {
    this.$emit("updateTags", this.$route.params.url);

    // this.getArticleList();
  },
  async mounted() {
    this.$emit("init");
  },
  updated() {},
  data() {
    return {};
  },
  methods: {
    async handleInfiniteLoading() {
      this.$emit("infiniteLoading");
    }
  },
  props: {
    list: Array
  },
  watch: {
    $route(_new, _old) {
      this.$emit("updateTags", _new.params.url);
      this.$emit("init");
    }
  }
};
</script>

<style>
</style>