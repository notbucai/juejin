<template>
  <section class="container article">
    <main class="article_main">
      <UserItem/>
      <article>
        <div
          class="hero"
          :style="{'background-image':'url(https://user-gold-cdn.xitu.io/2019/5/14/16ab64541d22911f?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)'}"
        ></div>
        <h1 class="title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h1>
        <div class="content">
          1231231231231
          <h1 class="heading" data-id="heading-0">VuePress(0.x版本)</h1>
        </div>
        <TagList/>
        <UserInfo/>
      </article>
    </main>
    <aside class="article_aside">
      <About/>
    </aside>
  </section>
</template>

<script>
import UserItem from "@/components/common/post/UserItem";
import UserInfo from "@/components/common/post/UserInfo";
import About from "@/components/common/post/About";
import TagList from "@/components/common/post/TagList";

export default {
  components: { About, UserItem, UserInfo, TagList },
  created() {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
$aside-width: 240px;
.container {
  min-height: 10000px;
}
.article {
  margin-top: 20px;
  position: relative;
  &_main {
    padding: 0 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    margin-right: $aside-width + 20px;
    background-color: #fff;
    min-height: 200px;
    @media (max-width: 960px) {
      margin-right: 0;
    }
    .hero {
      width: 100%;
      height: 360px;
      background-size: cover;
      margin-bottom: 20px;
    }
    .title {
      margin: 20px 0;
      font-size: 26px;
      font-weight: bold;
      line-height: 1.5;
      overflow: hidden;
      word-wrap: break-word;
    }
  }
  &_aside {
    width: $aside-width;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
