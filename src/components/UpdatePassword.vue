<template>
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Update Password
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Update Password
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label for="currPassword" class="form-label">Current Password:</label>
          <input
            type="password"
            class="form-control"
            id="currPassword"
            placeholder="Current Password"
            v-model="currPassword"
          />
          <label for="newPassword" class="form-label">New Password:</label>
          <input
            type="password"
            class="form-control"
            id="newPassword"
            placeholder="New Password"
            v-model="newPassword"
          />
          <p :style="messageStyle" v-if="message != ''">{{ message }}</p>
          <button class="btn btn-primary" @click="updatePassword">
            Update!
          </button>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword as updatePW,
} from "firebase/auth";
export default {
  name: "UpdatePassword-component",
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.user);
    const currPassword = ref("");
    const newPassword = ref("");
    const message = ref("");
    const messageStyle = ref("");
    const updatePassword = async () => {
      console.log("update password", currPassword.value, newPassword.value);
      try {
        const credential = EmailAuthProvider.credential(
          user.value.email,
          currPassword.value
        );
        await reauthenticateWithCredential(user.value, credential);
        await updatePW(user.value, newPassword.value);
        console.log("password updated");
        message.value = "Password updated!";
        messageStyle.value = "color: green; font-weight: bold";
      } catch (error) {
        console.log(error);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          message.value = "Wrong current password!";
        } else if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          message.value = "Password should be at least 6 characters!";
        } else {
          message.value = "Something went wrong!";
        }
        messageStyle.value = "color: red; font-weight: bold";
      }
    };
    return {
      currPassword,
      newPassword,
      message,
      messageStyle,
      updatePassword,
    };
  },
};
</script>

<style></style>
