<template>
  <video autoplay muted loop id="loginvid" style="position: fixed">
    <source src="../assets/signup.mp4" type="video/mp4" />
  </video>
  <div
    class="container col-md-6 col-lg-4 col-xl-3"
    style="overflow: hidden; position: relative; margin-top: 200px"
  >
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h2 class="signup-heading-title">Sign Up</h2>
      </div>
    </div>
    <div class="row logo mb-4 w-25 mx-auto">
      <img src="../assets/its-giving-logo.png" alt="" />
    </div>
    <div class="row justify-content-center login-box">
      <form action="#">
        <div class="row signup-form-group">
          <input
            type="text"
            class="signup-form-input"
            id="signupUsername"
            v-model="userName"
            placeholder="Username"
            required
          />
        </div>
        <div class="row signup-form-group">
          <input
            type="email"
            class="signup-form-input"
            id="signupEmail"
            aria-describedby="emailHelp"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="row signup-form-group">
          <input
            type="password"
            class="signup-form-input"
            id="signupPassword"
            v-model="password"
            placeholder="Password"
            required
          />
          <span class="show-password d-flex justify-content-end px-0 mt-2">
            <i id="showPassword" @click="showPassword">Show</i>
          </span>
        </div>
        <div class="row signup-form-group w-50 mx-auto">
          <button
            type="submit"
            class="signup-form-button btn btn-primary"
            @click.prevent="handleRegister"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SignupView",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const userName = ref("");
    const email = ref("");
    const password = ref("");
    const handleRegister = async () => {
      try {
        await store.dispatch("signup", {
          email: email.value,
          password: password.value,
          userName: userName.value,
        });
        // need to change this to match a query so that dont need to store in vuex
        router.push({ path: "/setup", query: { edit: true } });
      } catch (error) {
        console.log(error);
      }
    };
    return { handleRegister, userName, email, password };
  },
  methods: {
    showPassword() {
      var signupPassword = document.getElementById("signupPassword");
      var showPassword = document.getElementById("showPassword");
      if (signupPassword.type === "password") {
        signupPassword.type = "text";
        showPassword.classList.remove("bi-eye-slash");
        showPassword.classList.add("bi-eye");
      } else {
        signupPassword.type = "password";
        showPassword.classList.remove("bi-eye");
        showPassword.classList.add("bi-eye-slash");
      }
    },
  },
};
</script>
