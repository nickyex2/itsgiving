<template>
  <div class="container-fluid my-5 justify-content-center">
    <div v-if="editAccess" class="row w-25 ms-auto me-2">
      <button class="btn btn-warning" @click="handleEditCSP">
        edit CSP details
      </button>
    </div>
    <div class="cspContent">
      <div class="row">
        <h1>{{ csp.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getDatabase, ref as dbRefe, onValue } from "firebase/database";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    // get csp details from route
    const user = computed(() => store.getters.user);
    const editAccess = ref(false);
    const db = getDatabase();
    const csp = ref({}); // need to get all the deets that we want to show on the page
    const application = ref({});
    const handleEditCSP = () => {
      console.log("edit csp");
    };
    onBeforeMount(() => {
      // getting csp details
      const cspRef = dbRefe(db, "csp/" + route.params.id);
      onValue(cspRef, (snapshot) => {
        csp.value = snapshot.val();
        console.log(csp.value);
        if (user.value.email === csp.value.owner_email) {
          editAccess.value = true;
        }
      });
      const applyRef = dbRefe(db, "availability/" + route.params.id);
      onValue(applyRef, (snapshot) => {
        application.value = snapshot.val();
        console.log(application.value);
      });
    });
    return { csp, editAccess, handleEditCSP, application };
  },
};
</script>

<style></style>
