<template>
  <nav class="navbar fixed-top" :class="{ change_color: scrollPosition > 50 }">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="'/'">
        <img src="../assets/its-giving-logo.png" alt="logo" />
        ItsGiving</router-link
      >
      <ul
        class="navbar-nav me-auto mb-2 mb-lg-0 mt-1 navgone"
        style="display: -webkit-inline-box"
      >
        <li class="nav-item">
          <router-link :to="'/'" class="nav-link"> Home </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/search'" class="nav-link"> Search </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/about'" class="nav-link"> About </router-link>
        </li>
        <li class="nav-item" v-if="user">
          <router-link :to="'/create'" class="nav-link">Create CSP</router-link>
        </li>
      </ul>
      <div v-if="!user" class="navgone">
        <ul
          class="navbar-nav ms-auto mb-2 mb-lg-0"
          style="display: -webkit-inline-box"
        >
          <li class="nav-item">
            <router-link class="nav-link" :to="'/login'">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/signup'">Signup</router-link>
          </li>
        </ul>
      </div>

      <div v-else class="d-flex justify-content-end mt-1 navgone">
        <ul
          class="navbar-nav ms-auto mb-2 mb-lg-0"
          style="display: -webkit-inline-box"
        >
          <li class="nav-item" v-if="userAddInfo">
            <router-link class="nav-link" :to="'/profile'"
              >Welcome, {{ user.displayName }}</router-link
            >
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" :to="'/setup?edit=true'"
              >Setup Profile</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
        </ul>
      </div>

      <button
        class="navbar-toggler navappear"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        style="color: black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-list navbar-toggler-icon"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        style="width: fit-content; background-color: #d9d9d9"
      >
        <div class="offcanvas-header">
          <!-- <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5> -->
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body pt-0">
          <div v-if="!user" class="navgone">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" :to="'/login'">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="'/signup'"
                  >Signup</router-link
                >
              </li>
            </ul>
          </div>

          <div v-else class="d-flex justify-content-end mt-1">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item" v-if="userAddInfo">
                <router-link class="nav-link" :to="'/profile'"
                  >Welcome, {{ user.displayName }}</router-link
                >
              </li>
              <li class="nav-item" v-else>
                <router-link class="nav-link" :to="'/setup?edit=true'"
                  >Setup Profile</router-link
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout">Logout</a>
              </li>
            </ul>
          </div>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-1">
            <li class="nav-item">
              <router-link :to="'/'" class="nav-link"> Home </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/search'" class="nav-link">
                Search
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/about'" class="nav-link"> About </router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link :to="'/create'" class="nav-link"
                >Create CSP</router-link
              >
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
    const user = computed(() => store.getters.user);
    const userAddInfo = computed(() => store.getters.userAddInfo);
    const router = useRouter();
    const logout = async () => {
      await router.push("/");
      store.dispatch("logout");
    };
    return { user, logout, userAddInfo };
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
