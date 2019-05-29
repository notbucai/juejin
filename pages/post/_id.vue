<template>
  <section class="container article">
    <main class="article_main">
      <UserItem :user="main.user" :date="main.date" :reading="0"/>
      <article>
        <div
          class="hero"
          :style="{'background-image':'url(https://user-gold-cdn.xitu.io/2019/5/14/16ab64541d22911f?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)'}"
        ></div>
        <h1 class="title">{{main.title}}</h1>
        <div class="content" v-html="main.content"></div>
        <TagList :tags="main.tags"/>
        <UserInfo :user="main.user"/>
        <EditInput :user="main.user"/>
        <CommentList :comments="comments"/>
      </article>
    </main>
    <aside class="article_aside">
      <About/>
    </aside>
  </section>
</template>

<script>
import UserItem from "@/components/post/UserItem";
import UserInfo from "@/components/post/UserInfo";
import About from "@/components/post/About";
import TagList from "@/components/post/TagList";
import EditInput from "@/components/post/EditInput";
import CommentList from "@/components/post/CommentList";

export default {
  async asyncData({ route, app }) {
    const { id } = route.params;
    if ((id && id.length == 24) || id.length == 12) {
      return {
        main: await app.$api.post.getAeticleByid(id)
      };
    }
    // post 是文章 不是post请求
  },
  components: { About, UserItem, UserInfo, TagList, EditInput, CommentList },
  created() {},
  async mounted() {
    const { id } = this.$route.params;
    const data = await this.$api.comment.getCommentListByid(id);
    console.log(data);
    
    this.comments = data;
  },
  data() {
    return {
      main: {
        _id: "",
        title: "",
        content: "",
        date: "",
        updated: "",
        user: {},
        nav: {},
        tags: [],
        comments: [],
        like_size: 0,
        comments_size: 0
      },
      comments: [],
    };
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
    overflow: hidden;
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
