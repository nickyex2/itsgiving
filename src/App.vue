<template>
  <Navbar />
  <router-view />
  <div v-if="$route.name !== 'login' && $route.name !== 'signup'">
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { useStore } from "vuex";
import getUserAddInfo from "./services/getUserAddInfo";
import { computed } from "@vue/runtime-core";

export default {
  components: { Navbar, Footer },
  setup() {
    computed(() => {
      const store = useStore();
      const user = store.state.user;
      if (user) {
        getUserAddInfo(user.uid).then((res) => {
          store.commit("setUserAddInfo", res);
        });
      }
    });
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
