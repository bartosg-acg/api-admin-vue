<template>
  <main>
    <Menu />
    <div id="main-area" v-bind:style="{ marginLeft: mainAreaMarginLeft + 'px' }">
      <Header />
      <slot />
      <Footer />
    </div>
  </main>
</template>

<script>
import Header from "@/components/layoutComponents/Header.vue";
import Menu from "@/components/layoutComponents/Menu.vue";
import Footer from "@/components/layoutComponents/Footer.vue";

export default {
  data() {
    return {
      mainAreaMarginLeft: 0
    }
  },
  components: {
    Header,
    Menu,
    Footer
  },
  created() {
     if (localStorage.menuCollapsed != 'true' && window.innerWidth > 960) {
        this.mainAreaMarginLeft = 350;
      } else {
        this.mainAreaMarginLeft = 50;
      }
  }
};
</script>