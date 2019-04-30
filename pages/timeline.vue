<template>
  <section class="container">
    <!-- 二级 -->
    <Navigation :list="navigation"/>

    <transition name="disappear">
      <!-- 三级导航 -->
      <NavChildren v-if="tags && tags.length" :list="tags" :url="$route.params.url"/>
    </transition>
    <!-- 主体部分 -->
    <main class="timeline-main">
      <div class="timeline-list">
        <nuxt-child @updateTags="handleUpdateTwoNavList"/>
      </div>
      <aside class="timeline-aside">
        <div class="timeline-aside-wrap" v-scroll="handleAside">
          <RecommendAuthor/>
        </div>
        <RecommendBook/>
        <AsideInfo/>
      </aside>
    </main>
  </section>
</template>

<script>
import Navigation from "@/components/timeline/Navigation.vue";
import NavChildren from "@/components/timeline/NavChildren.vue";
import RecommendAuthor from "@/components/timeline/recommendAuthor.vue";
import RecommendBook from "@/components/timeline/recommendBook.vue";
import AsideInfo from "@/components/timeline/AsideInfo.vue";

export default {
  async asyncData({ app }) {
    const navigation = await app.$api.common.navigation();
    return {
      navigation
    };
  },
  components: {
    Navigation,
    RecommendAuthor,
    RecommendBook,
    AsideInfo,
    NavChildren
  },
  created() {},
  data() {
    return {
      navigation: [],
      tags: []
    };
  },
  watch: {
    $route(_new) {
      if (JSON.stringify(_new.params) == "{}") {
        this.tags = [];
      }
    }
  },
  methods: {
    handleAside(evt, el) {
      if (window.scrollY > el.parentNode.offsetHeight + 30) {
        if (!el.parentNode.height) {
          el.parentNode.height = el.parentNode.offsetHeight;
        }
        el.style.opacity = 0;
        el.style.opacity = 1;
        el.classList.add("top");
      } else {
        el.classList.remove("top");
      }
    },
    async handleUpdateTwoNavList(url) {
      if (!url) {
        throw new Error("url错误");
      }
      const nav = this.navigation.find(item => {
        return item.url == url;
      });

      if (!nav) {
        throw new Error("获取数据错误");
      }
      const data = await this.$api.common.getTagsByNavId(nav._id);

      this.tags = [
        {
          id: 0,
          title: "全部"
        },
        ...(data || [])
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
$aside-width: 240px;
.container {
  margin-top: 60px;
  position: relative;
  height: 10000px;
  .disappear-enter-active,
  .disappear-leave-active {
    transition: opacity 0.2s;
  }
  .disappear-enter, .disappear-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
.timeline {
  &-main {
    position: relative;
    /* margin-top: 15px; */
  }
  &-list {
    margin-right: $aside-width + 20px;
    background-color: #fff;
    @media (max-width: 960px) {
      margin-right: 0;
    }
  }
  &-aside {
    position: absolute;
    top: 0;
    right: 0;
    width: $aside-width;
    /* background-color: #fff; */
    min-height: 400px;
    @media (max-width: 960px) {
      display: none;
    }
    &-wrap {
      width: 240px;
      z-index: -1;
      transition: all 0.8s;
      &.top {
        position: fixed;
        opacity: 1;
        z-index: 10;
        top: 120px;
      }
    }
  }
}
</style>