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
  head() {
    return {
      title: "掘金"
    };
  },
  // 列表数据不应该在 服务器渲染 应该在 客户端 利于维护
  // async asyncData({ app, route }) {
  //   const articleObj = await app.$api.common.getAeticleListByNav_id({
  //     sort: route.query.sort
  //   });
  //   return {
  //     articleObj
  //   };
  // },

  async mounted() {
    this.$emit("init");
  },
  watch: {
    async $route(newRoute) {
      this.$emit("init");
    }
  },
  components: { MainList, InfiniteLoading },
  created() {},
  props: {
    list: Array
  },
  data() {
    return {
      articleObj: {
        list: [],
        hasNextPage: false
      },
      loading: false,
      page: 1
    };
  },
  methods: {
    async handleInfiniteLoading() {
      this.$emit("infiniteLoading");
    }
  }
};
</script>

<style>
</style>