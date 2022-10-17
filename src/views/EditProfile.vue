<template>
  <h1>This is the edit profile view</h1>
  <input type="text" v-model="name" /> Name
  <input type="text" v-model="email" /> Email
  <input type="password" v-model="password" /> Password
  <input type="file" /> Profile Picture
  <input type="text" v-model="phoneNumber" /> phone number
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import { getStorage } from "firebase/storage";

export default {
  name: "EditProfile",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    // const storage = getStorage();
    // if the user accidentally found this page without clicking the edit button on the profile page, redirect them to the profile page
    if (!store.getters.editUser) {
      router.push("/");
    }
    // set the boolean value back to false so that the user can't access this page again without clicking the edit button
    store.dispatch("editProfile", false);
    const user = store.getters.user;
    const editedUser = {
      name: user.displayName,
      email: user.email,
      password: "",
      profilePicture: "",
      phoneNumber: "",
    };
    return { editedUser };
  },
};
</script>

<style></style>
