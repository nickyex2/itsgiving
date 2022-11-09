<template>
  <div
    class="container col-md-6 col-lg-4 col-xl-3"
    style="overflow: hidden; position: relative; margin-top: 200px"
  >
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h2 class="login-heading-title">Forget Password</h2>
      </div>
    </div>
    <div class="row justify-content-center login-box">
      <form action="#">
        <div class="row login-form-group">
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
        <div class="row" v-if="message != ''">
          <p :style="msgStyle">{{ message }}</p>
        </div>
        <div class="row login-form-group mx-auto">
          <button
            type="submit"
            class="col-6 login-form-button btn btn-primary px-4"
            @click.prevent="$emit('back')"
          >
            Go Back
          </button>
          <button
            type="submit"
            class="col-6 login-form-button btn btn-primary px-4"
            @click.prevent="handleSendEmail"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  name: "ForgetPassword-component",
  emits: ["back"],
  setup() {
    const email = ref("");
    const auth = getAuth();
    const message = ref("");
    const msgStyle = ref("");
    const handleSendEmail = async () => {
      console.log(email.value);
      await sendPasswordResetEmail(auth, email.value)
        .then(() => {
          message.value =
            "Email sent successfully! Please check your inbox or spam.";
          msgStyle.value = "color: green; font-weight: bold";
        })
        .catch((error) => {
          const errorMessage = error.message;
          // ..
          message.value = errorMessage;
          msgStyle.value = "color: red; font-weight: bold";
        });
    };
    return {
      email,
      handleSendEmail,
      message,
      msgStyle,
    };
  },
};
</script>

<style></style>
