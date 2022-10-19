<template>
  <h1>This is the profile page</h1>
  <button class="btn btn-success" @click="editProfile">Edit</button>
  <p>{{ user.displayName }}</p>
  <p>{{ user.email }}</p>
  <img :src="user.photoURL" alt="" />
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

export default {
  name: "ProfileView",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.getters.user);
    const editProfile = () => {
      store.dispatch("editProfileBool", true);
      router.push("/profile/edit");
    };
    return { user, editProfile };
  },
};
</script>

<style></style>
