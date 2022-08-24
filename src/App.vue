<template>
  <div id="app">
    <Home />
  </div>
</template>
<script>
import Home from "./components/Home.vue";

export default {
  mounted() {
    window.location.hash = "";
  },
  components: {
    Home,
  },
};
</script>
<style scoped></style>
