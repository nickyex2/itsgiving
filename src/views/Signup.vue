<template>
  <div class="container-fluid signup d-flex justify-content-center">
    <form class="my-5">
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
    </form>
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
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    return { handleRegister, userName, email, password };
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
