<template>
  <section class="container">
    <Navigation/>

    <div class="timeline-list">
      <nuxt-child/>
    </div>
    <aside class="timeline-aside">
      <div class="timeline-aside-wrap" v-scroll="handleAside">
        <RecommendAuthor/>
      </div>
      <RecommendBook/>
      <AsideInfo/>
    </aside>
  </section>
</template>

<script>
import Navigation from "@/components/timeline/navigation.vue";
import RecommendAuthor from "@/components/timeline/recommendAuthor.vue";
import RecommendBook from "@/components/timeline/recommendBook.vue";
import AsideInfo from "@/components/timeline/AsideInfo.vue";

export default {
  components: { Navigation, RecommendAuthor, RecommendBook, AsideInfo },
  created() {},
  data() {
    return {};
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
}
.timeline {
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
      }
    }
  }
}
</style>