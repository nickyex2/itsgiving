<template>
  <div class="container-fluid d-flex justify-content-center">
    <form class="my-5">
      <table class="setup-table">
        <tr>
          <td colspan="2">
            <h3>We want to get to know you more</h3>
          </td>
        </tr>
        <tr>
          <td>
            <label for="profilePic" class="form-label"
              >Set Profile Picture:</label
            >
          </td>
          <td>
            <input
              type="file"
              class="form-control"
              id="profilePic"
              @change="handleImg"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="phone" class="form-label">Phone Number:</label>
          </td>
          <td>
            <input
              type="tel"
              class="form-control"
              id="phone"
              size="8"
              v-model="userAddInfo.phoneNo"
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
              v-model="userAddInfo.telegramHandle"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="setupInterest" class="form-label">
              Interests (select at least 1):</label
            >
          </td>
          <td>
            <!-- wont load on refresh -->
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
                  v-model="userAddInfo.interest"
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
            <button @click.prevent="handleSetup">Submit</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { getDatabase, ref as dbRefe, onValue } from "firebase/database";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "setupProfile",
  setup() {
    const user = computed(() => store.state.user);
    const store = useStore();
    const db = getDatabase();
    const router = useRouter();
    const route = useRoute();
    console.log(route.query.edit);
    if (route.query.edit != "true") {
      router.push("/profile");
    }
    const interest_tags = ref([]);
    // getting interest tags
    // const dbRef = dbRefe(db, "interest-tags/");
    // console.log(dbRef);
    // onValue(dbRef, (snapshot) => {
    //   const data = snapshot.val();
    //   for (let key in data) {
    //     interest_tags.push(data[key]);
    //   }
    // });
    // console.log(interest_tags);
    const userAddInfo = ref({
      profilePicture: "",
      phoneNo: "",
      telegramHandle: "@",
      interest: [],
      hours: 0,
      no_of_csp_done: 0,
      approved_csp: false,
      pending_csp: false,
      rejected_csp: false,
    });
    const handleSetup = async () => {
      // settle profile picture first and remove from userAddInfo
      // then add the rest of the info to userAddInfo
      await store.dispatch("makeUserAddInfo", userAddInfo);
      // router.push("/");
    };
    const handleImg = (event) => {
      userAddInfo.value.profilePicture = event.target.files[0];
    };
    onBeforeMount(() => {
      const dbRef = dbRefe(db, "interest-tags/");
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
          interest_tags.value.push(data[key]);
        }
      });
    });
    return {
      interest_tags,
      userAddInfo,
      user,
      handleSetup,
      handleImg,
    };
  },
};
</script>

<style scoped>
.setup-table > tr > td {
  padding: 10px;
}
.setup-table {
  border-collapse: separate;
  border: 1px solid black;
  background-color: #f5f5f5;
  border-radius: 20px;
}
ul {
  padding-left: 0px;
}
li {
  list-style-type: none;
  text-align: left !important;
}
</style>
