<template>
  <h1>this is the approval table for owner</h1>
  <div class="d-flex justify-content-center">
    <table border="1" class="table table-dark w-75" v-if="applicants != null">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Interview Timing</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>
import { getDatabase, ref as dbRefe, onValue } from "firebase/database";
import { onBeforeMount, ref } from "vue";
export default {
  name: "ApprovalCsp-component",
  props: ["cspID"],
  setup(props) {
    const db = getDatabase();
    const applicants = ref({}); //need to merge the nested objects into one big object
    onBeforeMount(async () => {
      const applicantsRef = dbRefe(
        db,
        `availability/${props.cspID}/applicants`
      );
      onValue(applicantsRef, (snapshot) => {
        if (snapshot.exists()) {
          // applicants.value = snapshot.val();
          for (const [date, time] of Object.entries(snapshot.val())) {
            applicants.value[date] = time;
          }
          console.log(applicants.value);
        } else {
          applicants.value = null;
        }
      });
    });
    return { applicants };
  },
};
</script>

<style></style>
