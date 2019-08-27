<template>
  <div class="search">
    <form action="/search" class="search-form" :class="{focus:focus}" method="get">
      <input
        maxlength="32"
        @focus="handleShowAndHide(true)"
        @blur="handleShowAndHide(false)"
        placeholder="搜索更新啦"
        class="search-input"
        name="key"
        :value="$route.query.key || ''"
      >
      <i class="iconfont search-icon">&#xe632;</i>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focus: false
    };
  },
  methods: {
    handleShowAndHide(stat) {
      this.focus = !!stat;
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  &-form {
    display: flex;
    align-items: center;
    background-color: rgba(227, 231, 236, 0.2);
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    box-sizing: border-box;
    &.focus {
      background-color: #fff;
      border: 1px solid $fontActiveColor;
      .search-icon {
        color: $fontActiveColor;
      }
    }
  }
  /* search-icon */
  &-input {
    border: none;
    width: 100px;
    background-color: transparent;
    padding: 8px 10px;
    color: $fontColor;

    &::placeholder {
      color: #c2ccd5;
    }
    &:focus {
      outline: none;
    }
  }
  &-icon {
    padding: 0 10px;
    font-weight: bold;
    color: #c2ccd5;
    @media (max-width: 700px) {
      display: none;
    }
  }
}
</style>
