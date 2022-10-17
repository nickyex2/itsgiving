<template>
  <div class="container-fluid login d-flex justify-content-center">
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
              class="form-control"
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
              class="form-control"
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
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
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
    const handleLogin = async () => {
      // console.log("clicked");
      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        router.push("/");
      } catch (error) {
        err.value = "Invalid email or password";
      }
    };
    return { handleLogin, email, password, err };
  },
};
</script>

<style>
.login-table > tr > td {
  padding: 10px;
}
.login-table {
  border-collapse: separate;
  border: 1px solid black;
  background-color: #f5f5f5;
  border-radius: 20px;
}
</style>
