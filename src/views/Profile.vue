<template>
  <h1>This is the profile page</h1>
  <p>{{ user.displayName }}</p>
  <p>{{ user.email }}</p>
  <img :src="user.photoURL" alt="" />
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Profile-view",
  components: {},
  setup() {
    const file = ref(null);
    const store = useStore();
    const user = store.getters.user;
    return { user, file };
  },
};
</script>

<style></style>
