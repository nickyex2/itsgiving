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
      <tbody>
        <tr v-for="(applicant, id) in applicants" :key="id">
          <td>{{ applicant.full_name }}</td>
          <td>{{ applicant.email }}</td>
          <td>{{ applicant.datetime }}</td>
          <td>{{ applicant.status }}</td>
          <td>
            <button
              class="btn btn-success me-2"
              @click="approve(id, applicant.status)"
              v-if="applicant.status == 'pending'"
            >
              Approve
            </button>
            <button
              class="btn btn-danger"
              @click="reject(id, applicant.status)"
              v-if="applicant.status == 'pending'"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2 v-else>No data available</h2>
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
    const approve = (id, status) => {
      console.log("approve", id, status);
    };
    const reject = (id, status) => {
      console.log("reject", id, status);
    };
    onBeforeMount(async () => {
      const applicantsRef = dbRefe(
        db,
        `availability/${props.cspID}/applicants`
      );
      onValue(applicantsRef, (snapshot) => {
        if (snapshot.exists()) {
          // applicants.value = snapshot.val();
          for (const [date, time] of Object.entries(snapshot.val())) {
            for (const [timing, applicant] of Object.entries(time)) {
              for (const [key, value] of Object.entries(applicant)) {
                value["datetime"] = `${date} ${timing}`;
                applicants.value[key] = value;
              }
            }
          }
          console.log(applicants.value);
        } else {
          applicants.value = null;
        }
      });
    });
    return { applicants, approve, reject };
  },
};
</script>

<style></style>
