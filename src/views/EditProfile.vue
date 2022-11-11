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
              class="img-account-profile rounded-circle mb-2 img-fluid"
              :src="currPhoto"
              alt=""
              style="width: 150px"
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
                  v-model="editedUser.displayName"
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
                    v-model="editedUser.firstName"
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
                    v-model="editedUser.lastName"
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
                    v-model="editedUser.phoneNo"
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
    const currPhoto = ref("");
    const dbRef = dbRefe(db, "interest-tags/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      for (let key in data) {
        interest_tags.value.push(data[key]);
      }
    });
    const err = ref("");
    const editedUser = ref({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      profilePicture: "",
      phoneNo: "",
      telegramHandle: "@",
      interest: [],
    });
    onBeforeMount(() => {
      editedUser.value.displayName = user.value.displayName;
      editedUser.value.email = user.value.email;
      editedUser.value.profilePicture = user.value.photoURL;
      currPhoto.value = user.value.photoURL;
      editedUser.value.firstName = userAddInfo.value.firstName;
      editedUser.value.lastName = userAddInfo.value.lastName;
      editedUser.value.phoneNo = userAddInfo.value.phoneNo;
      editedUser.value.telegramHandle = userAddInfo.value.telegramHandle;
      if (userAddInfo.value.interest != undefined) {
        editedUser.value.interest = userAddInfo.value.interest;
      }
    });
    const changeProfilePic = (event) => {
      editedUser.value.profilePicture = event.target.files[0];
      currPhoto.value = URL.createObjectURL(event.target.files[0]);
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
      currPhoto,
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
