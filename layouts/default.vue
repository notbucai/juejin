<template>
  <div>
    <!-- 头部组件 -->
    <Head/>

    <!-- 路由 -->
    <nuxt/>
  </div>
</template>

<script>
import Head from "@/components/common/head/head";
export default {
  components: {
    Head
  }
};
</script>

<style>
html,body{
  background-color: #f4f5f5;
}
</style>
