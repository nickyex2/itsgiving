<template>
  <video autoplay muted loop id="loginvid" style="position: fixed">
    <source src="../assets/login.mp4" type="video/mp4" />
  </video>
  <div
    class="container col-md-6 col-lg-4 col-xl-3"
    style="overflow: hidden; position: relative; margin-top: 200px"
    v-if="!resetPassword"
    data-aos="fade-in"
    data-aos-duration="1500"
  >
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h2 class="login-heading-title">Welcome</h2>
      </div>
    </div>
    <div class="row logo mb-4 w-25 mx-auto">
      <img src="../assets/its-giving-logo.png" alt="" />
    </div>
    <div class="row justify-content-center login-box">
      <form action="#">
        <div class="row login-form-group mx-2">
          <input
            type="email"
            class="login-form-input"
            id="loginEmail"
            aria-describedby="emailHelp"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="row login-form-group mx-2">
          <input
            type="password"
            class="login-form-input"
            id="loginPassword"
            v-model="password"
            placeholder="Password"
            required
          />
          <span class="show-password d-flex justify-content-end px-0 mt-2">
            <i
              id="showPassword"
              @click="showPassword"
              style="right: 45%; position: absolute"
              >Show</i
            >
          </span>
        </div>
        <div class="row login-error">
          <p v-if="err.length" class="login-error-message">{{ err }}</p>
        </div>
        <div class="row login-form-group w-50 mx-auto">
          <button
            type="submit"
            class="login-form-button btn btn-primary px-4"
            @click.prevent="handleLogin"
          >
            Login
          </button>
        </div>
      </form>

      <p class="signup-text w-100 text-center">
        Do not have an account?
        <router-link class="signup-link" :to="'/signup'"> Sign Up </router-link>
      </p>
      <p class="signup-text w-100 text-center">
        <a href="#" class="signup-link" @click="forgetPassword">
          Forget Password
        </a>
      </p>
    </div>
  </div>
  <ForgetPassword @back="handleBack" v-else></ForgetPassword>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import ForgetPassword from "../components/ForgetPassword.vue";
export default {
  name: "Login-view",
  components: {
    ForgetPassword,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const err = ref("");
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters.user);
    const resetPassword = ref(false);
    const forgetPassword = () => {
      resetPassword.value = true;
    };
    const handleBack = () => {
      resetPassword.value = false;
    };
    const handleLogin = async () => {
      // console.log("clicked");
      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        await store.dispatch("setUserAddInfo", user.value.uid);
        router.push("/");
      } catch (error) {
        err.value = "Invalid email or password";
      }
    };
    return {
      handleLogin,
      forgetPassword,
      email,
      password,
      err,
      resetPassword,
      handleBack,
    };
  },
  methods: {
    showPassword() {
      var loginPassword = document.getElementById("loginPassword");
      if (loginPassword.type === "password") {
        loginPassword.type = "text";
      } else {
        loginPassword.type = "password";
      }
    },
  },
};
</script>
