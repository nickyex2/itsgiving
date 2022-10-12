<template>
  <div class="login">
    <h1>This is a login page</h1>
    <form>
      <div class="mb-3">
        <label for="loginEmail" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="loginEmail"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="loginPassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="loginPassword"
          v-model="password"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="handleLogin"
      >
        Login
      </button>
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
        console.log(error);
      }
    };
    return { handleLogin, email, password };
  },
};
</script>

<style></style>
