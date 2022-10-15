<template>
  <div class="signup">
    <h1>This is a signup page</h1>
    <form>
      <div class="mb-3">
        <label for="signupUsername" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="signupUsername"
          v-model="userName"
        />
      </div>
      <div class="mb-3">
        <label for="signupEmail" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="signupEmail"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <p>{{ email }}</p>
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="signupPassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="signupPassword"
          v-model="password"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="handleSignup"
      >
        Signup
      </button>
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
    const handleSignup = async () => {
      console.log("clicked signup");
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
    return { handleSignup, userName, email, password };
  },
};
</script>

<style></style>
