<template>
  <div class="aside_block">
    <header>
      {{title}}
      <div class="right">
        <slot name="right"></slot>
      </div>
    </header>
    <main>
      <slot name="main">Null</slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AsideBlock",
  props: {
    title: String
  }
};
</script>

<style lang="scss" scoped>
@mixin boxStyle() {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}
.aside_block {
  background-color: #fff;
  @include boxStyle;
}
header {
  position: relative;
  padding: 14px 16px;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  .right {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 14px 15px;
    box-sizing: border-box;
  }
}
footer {
  border-top: 1px solid #f0f0f0;
  text-align: center;
}
</style>

