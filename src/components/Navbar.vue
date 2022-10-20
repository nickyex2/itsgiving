<template>
  <nav
    class="navbar navbar-expand-lg"
    :class="{ change_color: scrollPosition > 50 }"
  >
    <!-- can edit this is just the base line -->
    <div class="navhead container-fluid">
      <router-link class="navbar-brand" :to="'/'">ItsGiving</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <img src="../assets/column-view.png" class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="'/'" class="nav-link"> Home </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/search'" class="nav-link"> Search </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/about'" class="nav-link"> About </router-link>
          </li>
        </ul>

        <div v-if="!user" class="">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="'/login'">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="'/signup'">Signup</router-link>
            </li>
          </ul>
        </div>

        <div v-else class="d-flex justify-content-end mt-1">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <img
              :src="user.photoURL"
              alt=""
              style="width: 45px; height: 45px"
            />
            <li class="nav-item">
              <router-link class="nav-link" :to="'/profile'"
                >Profile: {{ user.email }}</router-link
              >
            </li>
            <li class="nav-item">
              <button class="nav-link btn" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "NavBar",
  components: {},
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const router = useRouter();
    const logout = () => {
      store.dispatch("logout");
      router.push("/");
    };
    return { user, logout };
  },
  data: function () {
    return {
      scrollPosition: null,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>

<style></style>
