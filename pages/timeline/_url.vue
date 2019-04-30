<template>
  <section>
    <MainList/>
  </section>
</template>

<script>
import MainList from "@/components/timeline/MainList";

export default {
  components: {MainList},
  created() {
    this.$emit("updateTags", this.$route.params.url);
  },
  updated() {},
  data() {
    return {};
  },
  methods: {},
  watch: {
    $route(_new, _old) {
      this.$emit("updateTags", _new.params.url);
    }
  }
};
</script>

<style>
</style>