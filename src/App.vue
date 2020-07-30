<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    layout() {
      /*
      if (!this.$store.state.loggedIn) {
        return "empty-layout";
      } else {
        */
        return "default-layout";
      //}
    }
  },
  created() {}
};
</script>

<style lang="scss">

</style>
