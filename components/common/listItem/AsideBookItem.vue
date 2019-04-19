<template>
  <nuxt-link class="book_item" :to="id">
    <div class="book-poster">
      <img :src="poster" :alt="title">
    </div>
    <div class="book-info">
      <div class="title">{{title}}</div>
      <div class="price">
        <span class="new">新人价 ¥ {{price}}</span>
        <span class="old">¥ {{old}}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    poster: String,
    title: String,
    price: String,
    old: String
  }
};
</script>

<style lang="scss" scoped>
.book_item {
  padding: 14px 15px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  .book {
    &-poster {
      min-width: 52px;
      width: 52px;
      height: 72px;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-info {
      flex-grow: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .title {
        color: #000;
        font-size: 14px;
        line-height: 1.3;
        font-weight: 500;
      }
      .price {
        width: 100%;
        word-break: break-all;
        font-size: 14px;
        margin-top: 10px;
        .new {
          margin-right: 6px;
          color: #fc4544;
        }
        .old {
          color: #878c90;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
