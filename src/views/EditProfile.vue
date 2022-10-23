<template>
  <div class="container-xl px-4 mt-4 py-5">
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0 profile-all">
          <div class="card-header">Profile Picture</div>
          <div class="card-body text-center">
            <!-- Profile picture image-->
            <img
              class="img-account-profile rounded-circle mb-2"
              src="http://bootdey.com/img/Content/avatar/avatar1.png"
              alt=""
            />
            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-3">
              Change Profile Picture
            </div>
            <!-- Profile picture upload button-->
            <input
              type="file"
              class="form-control"
              id="editProfilePic"
              @change="changeProfilePic"
            />
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <!-- Account details card-->
        <div class="card mb-4 profile-all">
          <div class="card-header">Account Details</div>
          <div class="card-body">
            <form>
              <!-- Form Group (username)-->
              <div class="mb-3 edit-title">
                <label for="editUsername" class="form-label small mb-1"
                  >Username:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="editUsername"
                  v-model="editedUser.name"
                />
              </div>
              <!-- Form Row-->
              <div class="row gx-3 mb-3 edit-title">
                <!-- Form Group (first name)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputFirstName"
                    >First name</label
                  >
                  <input
                    class="form-control"
                    id="inputFirstName"
                    type="text"
                    placeholder="Enter your first name"
                    value="Valerie"
                  />
                </div>
                <!-- Form Group (last name)-->
                <div class="col-md-6">
                  <label class="small mb-1 edit-title" for="inputLastName"
                    >Last name</label
                  >
                  <input
                    class="form-control"
                    id="inputLastName"
                    type="text"
                    placeholder="Enter your last name"
                    value="Luna"
                  />
                </div>
              </div>

              <!-- Form Group (email address)-->
              <div class="mb-3 edit-title">
                <label for="editEmail" class="form-label small mb-1"
                  >Email address</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="editEmail"
                  v-model="editedUser.email"
                  disabled
                />
              </div>

              <!-- Form Row-->
              <div class="row gx-3 mb-3 edit-title">
                <!-- Form Group (phone number)-->
                <div class="col-md-6">
                  <label for="editPhone" class="form-label small mb-1"
                    >Change Phone Number
                  </label>
                  <input
                    type="tel"
                    class="form-control"
                    id="editPhone"
                    size="8"
                    v-model="editedUser.phoneNumber"
                  />
                </div>
                <!-- Form Group (phone number)-->
                <div class="col-md-6">
                  <label for="editTeleHandle" class="form-label small mb-1"
                    >Telegram Handle</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="editTeleHandle"
                    v-model="editedUser.telegramHandle"
                  />
                </div>
              </div>

              <!-- Form Group (email address)-->
              <div class="edit-title">
                <label for="editInterest" class="form-label edit-title">
                  Interests:
                </label>
              </div>
              <div
                v-for="interest_tag in interest_tags"
                :key="interest_tag"
                class="align-items-left form-check form-check-inline small mb-2"
              >
                <label
                  :for="interest_tag"
                  class="form-check-label small mb-1"
                  >{{ interest_tag }}</label
                >
                <input
                  type="checkbox"
                  :id="interest_tag"
                  class="form-check-input"
                  :value="interest_tag"
                  v-model="editedUser.interest"
                />
              </div>

              <!-- Form Row-->
              <div class="row gx-3 mb-3 edit-title mt-2">
                <!-- Form Group (phone number)-->
                <div class="col-md-6">
                  <label for="editPassword" class="form-label small mb-1"
                    >Password:</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="editPassword"
                    v-model="editedUser.password"
                  />
                </div>
                <!-- Form Group (phone number)-->
                <div class="col-md-6">
                  <label for="confirmPassword" class="form-label small mb-1"
                    >Confirm Password:</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="editedUser.confirmPassword"
                  />
                </div>
                <div v-if="err != ''" class="errcode">
                  <div>
                    {{ err }}
                  </div>
                </div>
              </div>

              <!-- Save changes button-->
              <button
                type="submit"
                class="btn btn-primary mt-2"
                @click.prevent="handleEdit"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="container-fluid d-flex justify-content-center">
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
  </div> -->
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
