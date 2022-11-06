<template>
  <div class="d-flex justify-content-center approvalcsp container col-8 mb-5">
    <table class="table table-responsive-md" v-if="applicants != null">
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
          <td class="tabled">{{ applicant.full_name }}</td>
          <td class="tabled">{{ applicant.email }}</td>
          <td class="tabled">{{ applicant.datetime }}</td>
          <td class="tabled">{{ applicant.status }}</td>
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
  props: ["cspID", "cspHours"],
  setup(props) {
    const db = getDatabase();
    const applicants = ref({}); //need to merge the nested objects into one big object
    const approve = async (id, status) => {
      console.log("approve", id, status);
      const userRef = dbRefe(db, `users/${id}`);
      const data = ref({});
      const pending_csp = ref([]);
      const approved_csp = ref([]);
      onValue(userRef, (snapshot) => {
        if (snapshot.val()) {
          data.value = snapshot.val();
          pending_csp.value = data.value.pending_csp;
          if (data.value.approved_csp) {
            approved_csp.value = data.value.approved_csp;
          }
        }
      });
      // remove cspid from pending_csp
      pending_csp.value = pending_csp.value.filter((csp) => csp != props.cspID);
      if (pending_csp.value.length == 0) {
        pending_csp.value = false;
      }
      // add cspid to approved_csp
      approved_csp.value.push(props.cspID);
      console.log("pending_csp", pending_csp.value);
      console.log("approved_csp", approved_csp.value);
      // update the user's data
      // await update(userRef, {
      //   pending_csp: pending_csp.value,
      //   approved_csp: approved_csp.value,
      //   hours: data.value.hours + props.cspHours,
      // });
      // update the availability data for the csp
      const availRef = dbRefe(db, `availability/${props.cspID}`);
      const availData = ref({});
      onValue(availRef, (snapshot) => {
        if (snapshot.val()) {
          availData.value = snapshot.val();
        }
      });
      // change the applicant status to approved from the availability data
    };
    const reject = (id, status) => {
      console.log("reject", id, status);
      const userRef = dbRefe(db, `users/${id}`);
      const data = ref({});
      const pending_csp = ref([]);
      const rejected_csp = ref([]);
      onValue(userRef, (snapshot) => {
        if (snapshot.val()) {
          data.value = snapshot.val();
          pending_csp.value = data.value.pending_csp;
          if (data.value.approved_csp) {
            rejected_csp.value = data.value.rejected_csp;
          }
        }
      });
      // remove cspid from pending_csp
      pending_csp.value = pending_csp.value.filter((csp) => csp != props.cspID);
      if (pending_csp.value.length == 0) {
        pending_csp.value = false;
      }
      // add cspid to approved_csp
      rejected_csp.value.push(props.cspID);
      console.log("pending_csp", pending_csp.value);
      console.log("rejected_csp", rejected_csp.value);
      // update the user's data
      // await update(userRef, {
      //   pending_csp: pending_csp.value,
      //   approved_csp: approved_csp.value,
      //   hours: data.value.hours + props.cspHours,
      // });
      // update the availability data for the csp
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
