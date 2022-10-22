<template>
  <div class="container-fluid d-flex justify-content-center">
    <form class="my-5">
      <table class="editProfile-table">
        <tr>
          <td colspan="2">
            <h3>Edit Profile</h3>
          </td>
        </tr>
        <tr>
          <td>
            <label for="editUsername" class="form-label">Username:</label>
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              id="editUsername"
              v-model="editedUser.name"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="editEmail" class="form-label">Email address:</label>
          </td>
          <td>
            <input
              type="email"
              class="form-control"
              id="editEmail"
              v-model="editedUser.email"
              disabled
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="editProfilePic" class="form-label"
              >Set Profile Picture:</label
            >
          </td>
          <td>
            <input
              type="file"
              class="form-control"
              id="editProfilePic"
              @change="changeProfilePic"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="editPhone" class="form-label"
              >Change Phone Number:
            </label>
          </td>
          <td>
            <input
              type="tel"
              class="form-control"
              id="editPhone"
              size="8"
              v-model="editedUser.phoneNumber"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="editTeleHandle" class="form-label"
              >Telegram Handle:</label
            >
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              id="editTeleHandle"
              v-model="editedUser.telegramHandle"
            />
          </td>
        </tr>
        <tr>
          <td>Interests:</td>
          <td>
            <ul>
              <li
                v-for="interest_tag in interest_tags"
                :key="interest_tag"
                class="align-items-left form-check form-check-inline"
              >
                <input
                  type="checkbox"
                  :id="interest_tag"
                  class="form-check-input"
                  :value="interest_tag"
                  v-model="editedUser.interest"
                />
                <label :for="interest_tag" class="form-check-label">{{
                  interest_tag
                }}</label>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p class="form-text">Enter your password to confirm changes:</p>
          </td>
        </tr>
        <tr>
          <td>
            <label for="editPassword" class="form-label">Password:</label>
          </td>
          <td>
            <input
              type="password"
              class="form-control"
              id="editPassword"
              v-model="editedUser.password"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="confirmPassword" class="form-label"
              >Confirm Password:</label
            >
          </td>
          <td>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="editedUser.confirmPassword"
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
              @click.prevent="handleEdit"
            >
              Submit
            </button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed, onBeforeMount } from "vue";
import { getDatabase, ref as dbRefe, onValue } from "firebase/database";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default {
  name: "EditProfile",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const db = getDatabase();
    // if the user accidentally found this page without clicking the edit button on the profile page, redirect them to the profile page
    if (!store.getters.editUserBool) {
      router.push("/");
    }
    // set the boolean value back to false so that the user can't access this page again without clicking the edit button
    store.dispatch("editProfileBool", false);
    const user = computed(() => store.getters.user);
    const userAddInfo = computed(() => store.getters.userAddInfo);
    const interest_tags = ref([]);
    const dbRef = dbRefe(db, "interest-tags/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      for (let key in data) {
        interest_tags.value.push(data[key]);
      }
    });
    const err = ref("");
    const editedUser = ref({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
      phoneNumber: "",
      telegramHandle: "@",
      interest: [],
    });
    onBeforeMount(() => {
      editedUser.value.name = user.value.displayName;
      editedUser.value.email = user.value.email;
      editedUser.value.profilePicture = user.value.photoURL;
      editedUser.value.phoneNumber = userAddInfo.value.phoneNo;
      editedUser.value.telegramHandle = userAddInfo.value.telegramHandle;
      editedUser.value.interest = userAddInfo.value.interest;
    });
    const changeProfilePic = (event) => {
      editedUser.value.profilePicture = event.target.files[0];
    };
    const handleEdit = async () => {
      if (editedUser.value.password !== editedUser.value.confirmPassword) {
        err.value = "Passwords do not match";
      } else {
        try {
          await reauthenticateWithCredential(
            store.getters.user,
            EmailAuthProvider.credential(
              user.value.email,
              editedUser.value.password
            )
          );
          await store.dispatch("updateUserAddInfo", editedUser.value);
          router.push("/profile");
        } catch (error) {
          err.value = "Incorrect password";
        }
      }
    };
    return {
      editedUser,
      changeProfilePic,
      handleEdit,
      err,
      interest_tags,
    };
  },
};
</script>

<style>
.editProfile-table > tr > td {
  padding: 10px;
}
.editProfile-table {
  border-collapse: separate;
  border: 1px solid black;
  background-color: #f5f5f5;
  border-radius: 20px;
}
</style>
