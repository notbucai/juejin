<template>
  <section class="edit" @click="hanleOptionspublishStat">
    <header>
      <input type="text" class="title-input" placeholder="请输入文章标题..." />
      <div class="publish hero" ref="hero">
        <div class="action" @click="handleHeroOpen">
          <i class="iconfont open">&#xe71b;</i>
        </div>
        <div class="options" v-show="heroStat">
          <h3>添加封面大图</h3>
          <div class="upload">
            <div class="noupload" @click="handleFileInputOpen">
              <input type="file" ref="upload" @change="handleUploadImg" hidden>
            </div>
          </div>
        </div>
      </div>
      <div class="publish" ref="publish">
        <div class="action" @click="handleChangeStat">
          <button>发表</button>
          <i class="iconfont open" :class="{rotat:publishStat}">&#xe608;</i>
        </div>
        <div class="options" v-show="publishStat">
          <h3>发表文章</h3>
          <div class="box">
            <div class="title">分类</div>
            <ul class="list">
              <li class="item">aa</li>
              <li class="item on">JAVA</li>
              <li class="item">Android</li>
              <li class="item">Test</li>
              <li class="item">baidu</li>
              <li class="item on">999</li>
              <li class="item">aa</li>
            </ul>
          </div>
          <div class="box">
            <div class="title">标签</div>
            <ul class="list">
              <li class="item">aa</li>
            </ul>
          </div>
          <div class="submit">
            <button>确定并发布</button>
          </div>
        </div>
      </div>
      <User class="right" />
    </header>
    <no-ssr>
      <mavon-editor v-model="value" :boxShadow="false" />
    </no-ssr>
  </section>
</template>

<script>
import User from "@/components/common/head/user";

export default {
  layout: "clean",
  head() {
    return {
      title: "写文章"
    };
  },
  components: { User },
  created() {},
  data() {
    return {
      value: "",
      publishStat: false,
      heroStat: false
    };
  },
  methods: {
    handleFileInputOpen(){
      this.$refs['upload'].click();
    },
    async handleUploadImg(event){
      const file = event.target.files[0];
      if(!file){
        return;
      }
      const data = await this.$api.upload.img(file);
      console.log(data);
      this.$alert("123");
    },
    handleHeroOpen() {
      this.heroStat = true;
    },
    handleChangeStat() {
      this.publishStat = !this.publishStat;
    },
    handleIsCurrentElement(el, ref) {
      for (let i = 0; i <= 100; i++) {
        if (el === document.documentElement) {
          break;
        }
        el = el.parentElement;
        if (el === ref) {
          return true;
        }
      }
      return false;
    },
    hanleOptionspublishStat(event) {
      if (!this.handleIsCurrentElement(event.target, this.$refs["publish"])) {
        this.publishStat = false;
      }
      if (!this.handleIsCurrentElement(event.target, this.$refs["hero"])) {
        this.heroStat = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  height: 100%;
  position: absolute;
  height: 100%;
  width: 100%;
  .v-note-wrapper {
    z-index: 1;
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  > header {
    height: 50px;
    background-color: #fff;
    position: relative;
    display: flex;
    .title-input {
      flex-grow: 1;
      height: 100%;
      border: none;
      padding: 0;
      padding-left: 10px;
      font-size: 20px;
      outline: none;
      font-weight: 700;
      color: #000;
    }
    > .right {
      margin-right: 20px;
    }
  }
}
.publish {
  &.hero {
    .action {
      margin-right: 10px;
      > .open {
        color: #777;
        font-size: 28px;
      }
    }
  }
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  .action {
    margin-right: 10px;
    display: flex;
    align-items: center;
    height: 40px;
    box-sizing: border-box;
    user-select: none;
    > button {
      border: none;
      background-color: #2196f3;
      color: #fff;
      padding: 6px 16px;
      font-size: 16px;
      /* color: black; */
      cursor: pointer;
      border-radius: 2px;
    }
    .open {
      color: #2196f3;
      font-size: 20px;
      padding: 6px;
      cursor: pointer;
      transition: all 0.5s;
      display: block;
      &.rotat {
        transform: rotate(180deg);
      }
    }
  }
  .options {
    position: absolute;
    width: 300px;
    top: 60px;
    right: -40px;
    z-index: 1000;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    box-shadow: 0 0 2px #eee;
    &::after {
      content: "";
      position: absolute;
      top: -11px;
      right: 60px;
      background-color: #fff;
      width: 20px;
      height: 20px;
      display: block;
      transform: rotate(45deg);
      border: 1px solid #dedede;
      border-right: none;
      border-bottom: none;
      box-shadow: -1px -1px 0px #eee9;
    }
    > h3 {
      font-size: 18px;
      color: #888;
    }
    > .upload {
      .noupload {
        width: 100%;
        height: 100px;
        background-color: #f0f0f0;
        border-radius: 4px;
        position: relative;
        margin-top: 10px;
        cursor: pointer;
        &::after{
          content: "点击上传图片";
          color: #999;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    > .box {
      margin-top: 20px;
      color: #999;
      > .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
      > .list {
        display: flex;
        flex-wrap: wrap;
        > .item {
          color: #999;
          margin: 0 10px 10px 0;
          padding: 4px 10px;
          white-space: nowrap;
          border: 1px solid #f1f1f1;
          border-radius: 2px;
          cursor: pointer;
          font-size: 14px;
          &.on {
            color: #007fff;
            border-color: rgba(0, 127, 255, 0.15);
            background-color: rgba(0, 127, 255, 0.05);
          }
        }
      }
    }
    > .submit {
      text-align: center;
      button {
        font-size: 16px;
        color: #2196f3;
        border-color: #2196f3;
        border-radius: 2px;
        padding: 4px 16px;
        outline: none;
        cursor: pointer;
        &:hover {
          background-color: #acd9ff33;
        }
      }
    }
  }
}
</style>