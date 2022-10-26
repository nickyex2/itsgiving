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
        <h2 class="heading-title">Sign Up</h2>
      </div>
    </div>
    <div class="row logo mb-4 w-25 mx-auto">
      <img src="../assets/its-giving-logo.png" alt="" />
    </div>
    <div class="row justify-content-center login-box">
      <form action="#">
        <div class="row form-group">
          <input
            type="text"
            class="form-input"
            id="signupUsername"
            v-model="userName"
            placeholder="Username"
            required
          />
        </div>
        <div class="row form-group">
          <input
            type="email"
            class="form-input"
            id="signupEmail"
            aria-describedby="emailHelp"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="row form-group">
          <input
            type="password"
            class="form-input"
            id="signupPassword"
            v-model="password"
            placeholder="Password"
            required
          />
          <span class="show-password d-flex justify-content-end px-0 mt-2">
            <i id="showPassword" @click="showPassword">Show</i>
          </span>
        </div>
        <div class="row form-group w-50 mx-auto">
          <button
            type="submit"
            class="form-button btn btn-primary"
            @click.prevent="handleRegister"
          >
            Register
          </button>
        </div>
      </form>
    </div>

    <!-- <form class="my-5">
      <table class="signup-table">
        <tr>
          <td colspan="2">
            <h3>Signup</h3>
          </td>
        </tr>
        <tr>
          <td>
            <label for="signupUsername" class="form-label">Username:</label>
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              id="signupUsername"
              v-model="userName"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="signupEmail" class="form-label">Email address:</label>
          </td>
          <td>
            <input
              type="email"
              class="form-control"
              id="signupEmail"
              aria-describedby="emailHelp"
              v-model="email"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="signupPassword" class="form-label">Password:</label>
          </td>
          <td>
            <input
              type="password"
              class="form-control"
              id="signupPassword"
              v-model="password"
              required
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="handleRegister"
            >
              Register
            </button>
          </td>
        </tr>
      </table>
    </form> -->
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
      var x = document.getElementById("signupPassword");
      var y = document.getElementById("showPassword");
      if (x.type === "password") {
        x.type = "text";
        y.classList.remove("bi-eye-slash");
        y.classList.add("bi-eye");
      } else {
        x.type = "password";
        y.classList.remove("bi-eye");
        y.classList.add("bi-eye-slash");
      }
    },
  },
};
</script>

<style>
.signup-table > tr > td {
  padding: 10px;
}
.signup-table {
  border-collapse: separate;
  border: 1px solid black;
  background-color: #f5f5f5;
  border-radius: 20px;
}
</style>
