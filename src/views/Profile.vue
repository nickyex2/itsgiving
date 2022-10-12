<template>
  <h1>This is the profile page</h1>
  <p>{{ user.displayName }}</p>
  <p>{{ user.email }}</p>
  <input type="file" @change="printFile" ref="file" />
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
    const printFile = async () => {
      console.log(file.value.files);
    };

    return { user, file, printFile };
  },
};
</script>

<style></style>
