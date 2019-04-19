<template>
  <AsideBlock title="掘金小册" class="recommed_author">
    <div slot="right" class="book_action">
      <i class="iconfont prev" @click="prevBooksIndex">&#xe62e;</i>
      <i class="iconfont next" @click="nextBooksIndex">&#xe62e;</i>
    </div>
    <div slot="main">
      <AsideBookItem v-for="item in c_list" :key="item.id" v-bind="item"/>
    </div>
    <nuxt-link slot="footer" to="/" class="author_more">
      <span>查看更多</span>
      <i class="iconfont">&#xe62e;</i>
    </nuxt-link>
  </AsideBlock>
</template>

<script>
import AsideBlock from "@/components/timeline/AsideBlock.vue";
import AsideBookItem from "@/components/common/listItem/AsideBookItem.vue";
export default {
  components: {
    AsideBlock,
    AsideBookItem
  },
  data() {
    return {
      list: [
        {
          id: "12312",
          poster:
            "https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
          title: "123阿斯顿发生地方",
          old: "123",
          price: "2222"
        },
        {
          id: "1222",
          poster:
            "https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
          title: "阿斯顿嘎嘎撒的发生过",
          old: "123",
          price: "2222"
        },
        {
          id: "12333312",
          poster:
            "https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
          title: "阿斯顿发生地方",
          old: "123",
          price: "2222"
        },
        {
          id: "123",
          poster:
            "https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
          title: "网5也让告诉对方",
          old: "123",
          price: "2222"
        },
        {
          id: "adf",
          poster:
            "https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
          title: "阿斯顿噶地方北方人",
          old: "123",
          price: "2222"
        },
        {
          id: "1231432",
          poster:
            "https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
          title: "金黄色的噶收费规定法定个 v",
          old: "123",
          price: "2222"
        },
        {
          id: "423wedfv",
          poster:
            "https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
          title: "阿斯顿发生的发电分公司地方吧",
          old: "123",
          price: "2222"
        },
        {
          id: "134gv",
          poster:
            "https://leancloud-gold-cdn.xitu.io/bdfecd06f90e24f88946.jpeg?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
          title: "阿斯顿钢琴弹钢琴啊多少噶",
          old: "123",
          price: "2222"
        }
      ],
      index: 0,
    };
  },
  computed: {
    c_list() {
      const index = this.index;
      return this.list.slice(index * 2, index * 2 + 2);
    }
  },
  methods: {
    nextBooksIndex() {
      const len = Math.ceil(this.list.length / 2);
      this.index++;
      if (this.index >= len) {
        this.index = 0;
      }
    },
    prevBooksIndex() {
      const len = Math.ceil(this.list.length / 2);
      this.index--;
      if (this.index < 0) {
        this.index = len - 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.recommed_author {
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  .author_more {
    color: $fontActiveColor;
    text-align: center;
    display: block;
    padding: 14px 0;
    font-size: 14px;
    .iconfont {
      font-size: 14px;
      margin-left: -4px;
    }
  }
  .book_action {
    user-select: none;
    > i {
      display: inline-block;
      cursor: pointer;
      color: $fontColor;
    }
    .prev {
      transform: rotate(180deg);
    }
  }
}
</style>
