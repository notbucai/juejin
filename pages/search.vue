<template>
  <section class="container search">
    <main class="list">
      <ArticleItem v-for="item in list" :key="item._id" v-bind="item" @like="handleLike(item)" />
      <Skeleton01 v-if="!list || !list.length" />
      <InfiniteLoading @onInfiniteLoading="handleInfiniteLoading" />
    </main>
  </section>
</template>

<script>
import ArticleItem from "@/components/common/listItem/ArticleItem";
import Skeleton01 from "@/components/common/loading/Skeleton01";
import InfiniteLoading from "@/components/common/loading/InfiniteLoading";

export default {
  head() {
    return {
      title: this.$route.query.key
    };
  },
  components: {
    ArticleItem,
    Skeleton01,
    InfiniteLoading
  },
  created() {
    this.handleGetList();
  },
  data() {
    return {
      list: [],
      page: 1,
      loading: false
    };
  },
  methods: {
    async handleGetList() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const key = this.$route.query.key;
      if (!key) {
        this.$router.go(-1);
      }
      const { list, hasNextPage } = await this.$api.post.getArticleListByKey(
        key,
        this.page++
      );
      this.list = [...this.list, ...list];
      this.loading = false;
    },
    handleInfiniteLoading() {
      this.handleGetList();
    }
  }
};
</script>

<style lang="scss" scope>
.search {
  margin-top: 20px;
  .list {
    background-color: #fff;
    margin-right: 260px;
  }
}
</style>