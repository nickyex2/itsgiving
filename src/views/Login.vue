<template>
  <video autoplay muted loop id="loginvid" style="position: fixed">
    <source src="../assets/login.mp4" type="video/mp4" />
  </video>
  <!-- <div class="login container-fluid login d-flex justify-content-center">
    <form class="my-5">
      <table class="login-table">
        <tr>
          <td colspan="2">
            <h3>Login</h3>
          </td>
        </tr>
        <tr>
          <td>
            <label for="loginEmail" class="form-label">Email address:</label>
          </td>
          <td>
            <input
              type="email"
              class="form-input"
              id="loginEmail"
              aria-describedby="emailHelp"
              v-model="email"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="loginPassword" class="form-label">Password:</label>
          </td>
          <td>
            <input
              type="password"
              class="form-input"
              id="loginPassword"
              v-model="password"
            />
          </td>
        </tr>
        <tr v-if="err != ''" class="errcode">
          <td colspan="2">
            {{ err }}
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="handleLogin"
            >
              Login
            </button>
          </td>
        </tr>
      </table>
    </form>
  </div> -->
  <div
    class="container col-md-6 col-lg-4 col-xl-3"
    style="overflow: hidden; position: relative; margin-top: 200px"
  >
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h2 class="heading-title">Welcome</h2>
      </div>
    </div>
    <div class="row logo mb-4 w-25 mx-auto">
      <img src="../assets/its-giving-logo.png" alt="" />
    </div>
    <div class="row justify-content-center login-box">
      <form action="#">
        <div class="row form-group">
          <input
            type="email"
            class="form-input"
            id="loginEmail"
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
            id="loginPassword"
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
            class="form-button btn btn-primary px-4"
            @click.prevent="handleLogin"
          >
            Login
          </button>
        </div>
      </form>

      <p class="signup-text w-100 text-center">
        Do not have an account?
        <a class="signup-link" href="https://its-giving.netlify.app/signup">
          Sign Up
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Login-view",
  components: {},
  setup() {
    const email = ref("");
    const password = ref("");
    const err = ref("");
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters.user);
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
    return { handleLogin, email, password, err };
  },
  methods: {
    showPassword() {
      var x = document.getElementById("loginPassword");
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
.heading-title {
  font-size: 28px;
  color: rgba(255, 255, 255, 1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-input {
  display: block;
  width: 100%;
  height: 40px;
  padding: 20px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #333;
  background: rgb(255, 255, 255, 0.4);
  border: none;
  border-radius: 0.8rem;
  position: relative;
}

.form-input::placeholder {
  color: #666;
  opacity: 1;
}

.form-input:focus {
  outline: none;
  box-shadow: none;
  color: #495057;
  background-color: #fff;
}

.form-input:hover {
  background-color: #fff;
}

.form-button {
  border: none;
  outline: none;
  height: 40px;
  background: #fee48d;
  color: #333;
  font-size: 18px;
  border-radius: 20px;
  transition: 0.5s;
  cursor: pointer;
}

.form-button:hover {
  background: #e7ad5b9a;
  color: #fff;
  opacity: 1;
}

.signup-text {
  color: #333;
  font-size: 18px;
  font-weight: 500;
}

.signup-link {
  color: rgb(4, 83, 255);
  text-decoration: underline;
}

.show-password {
  position: absolute;
  right: 15px;
  width: 40px;
  color: #333;
  background: transparent;
  font-size: 15px;
  cursor: pointer;
}
</style>

<link rel=”stylesheet”
href=”https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css”
/>
