<template>
  <Navbar v-if="$route.name !== 'setupprofile'" />
  <router-view />
  <div
    v-if="
      $route.name !== 'login' &&
      $route.name !== 'signup' &&
      $route.name !== 'setupprofile'
    "
  >
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import AOS from "aos";

export default {
  components: { Navbar, Footer },
  setup() {},
  mounted() {
    AOS.init();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
