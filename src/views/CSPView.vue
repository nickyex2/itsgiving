<template>
  <div class="container-fluid my-5 justify-content-center">
    <div v-if="editAccess" class="row w-25 ms-auto me-2">
      <button class="btn btn-warning mt-3" @click="handleEditCSP">edit</button>
    </div>
    <div class="cspContent">
      <div class="row justify-content-center my-5">
        <div class="col-6">
          <!-- dummy carousel -->
          <div
            id="carouselExampleControls"
            class="carousel slide w-75 mx-auto"
            data-bs-ride="carousel"
            data-bs-interval="5000"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="csp.cover_image" class="d-block w-100" alt="..." />
              </div>
              <div
                class="carousel-item"
                v-for="photo in csp.photos"
                :key="photo"
              >
                <img :src="photo" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <!-- end of dummy carousel -->
          <div class="d-flex justify-content-center mt-2">
            <h3>Interview Timeslots available:</h3>
          </div>
          <div class="apply-csp">
            <div
              v-for="(times, date) in avail_DateTime"
              :key="date"
              class="d-flex justify-content-center py-2"
            >
              <b class="pe-4 my-auto">{{ date }}</b>
              <button v-for="time in times" :key="time" class="mx-2">
                <label :for="`${date}-${time}`">{{ time }}</label>
                <input
                  type="radio"
                  :id="`${date}-${time}`"
                  :value="`${date} ${time}`"
                  class="d-none"
                  v-model="appliedDateTime"
                />
              </button>
            </div>
            <div class="d-flex justify-content-center mt-2">
              <button @click="handleApply">Apply Now</button>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-4">
          <div class="csp-deets pb-2">
            <h1>{{ csp.name }}</h1>
            <h4>by {{ csp.owner }}</h4>
            <p>{{ csp.description }}</p>
          </div>
          <div class="csp-deets2 pb-2">
            <h5><b>Where:</b> {{ csp.address }}</h5>
            <h5><b>When:</b> {{ csp.date_start }}</h5>
            <h5><b>Est. No of Hours:</b> {{ csp.csp_hours }}h</h5>
          </div>
          <div class="csp-deets3">
            <h4><b>Supported Cause:</b></h4>
            <ul>
              <li v-for="interest in csp.interest" :key="interest">
                <img :src="interestImg[interest]" alt="" class="interest-img" />
                {{ interest }}
              </li>
            </ul>
          </div>
          <div class="csp-deets4">
            <h4><b>Contact Us:</b></h4>
            <p>{{ csp.owner_email }}</p>
            <p>{{ ownerInfo.phoneNo }}</p>
            <p>{{ ownerInfo.telegramHandle }}</p>
          </div>
        </div>
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
    const csp = ref({
      name: "",
      owner: "",
      description: "",
      address: "",
      date_start: "",
      csp_hours: "",
      owner_email: "",
      interest: [],
      cover_image: "",
      photos: [],
      no_of_interviews_per_hour: 0,
    }); // need to get all the deets that we want to show on the page
    const avail_DateTime = ref({});
    const interestImg = ref({});
    const ownerInfo = ref({
      phoneNo: "",
      telegramHandle: "",
    });
    const appliedDateTime = ref("");
    // applying for csp button
    const handleApply = () => {
      var dateTimeSplit = appliedDateTime.value.split(" ");
      console.log(dateTimeSplit);
      const db = getDatabase();
      const dbRef = dbRefe(
        db,
        `availability/${route.params.id}/applicants/${dateTimeSplit[0]}/${dateTimeSplit[1]}`
      );
      onValue(dbRef, (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val() != null) {
          // check if there are still slots available
          if (snapshot.val().length >= csp.value.no_of_interviews_per_hour) {
            alert("Sorry, no more slots available for this time slot");
          } else {
            console.log(
              "user application storing to db now - update() (NOT YET IMPLEMENTED)"
            );
          }
        } else {
          console.log(
            "user application storing to db now - set() (NOT YET IMPLEMENTED)"
          );
        }
      });
    };
    // owner edit csp button
    const handleEditCSP = () => {
      console.log("edit csp");
    };
    onBeforeMount(() => {
      // getting csp details
      const cspRef = dbRefe(db, "csp/" + route.params.id);
      onValue(cspRef, (snapshot) => {
        if (snapshot.val()) {
          csp.value.name = snapshot.val().name;
          csp.value.owner = snapshot.val().owner;
          csp.value.description = snapshot.val().description;
          csp.value.address = snapshot.val().location.address;
          csp.value.date_start = snapshot.val().date_start;
          csp.value.csp_hours = snapshot.val().csp_hours;
          csp.value.owner_email = snapshot.val().owner_email;
          csp.value.interest = snapshot.val().interest;
          csp.value.cover_image = snapshot.val().cover_image;
          csp.value.photos = snapshot.val().photos;
          csp.value.no_of_interviews_per_hour =
            snapshot.val().no_of_interviews_per_hour;
          // getting owner additional information
          const ownerRef = dbRefe(db, "users/" + snapshot.val().owner_uid);
          onValue(ownerRef, (snapshot2) => {
            if (snapshot2.val()) {
              ownerInfo.value.phoneNo = snapshot2.val().phoneNo;
              ownerInfo.value.telegramHandle = snapshot2.val().telegramHandle;
            }
          });
        }
        if (user.value && user.value.email === csp.value.owner_email) {
          editAccess.value = true;
        }
      });
      // getting interview timeslot details
      const applyRef = dbRefe(
        db,
        "availability/" + route.params.id + "/dates_avail"
      );
      onValue(applyRef, (snapshot) => {
        avail_DateTime.value = snapshot.val();
      });
      // getting interest images
      const interestImgRef = dbRefe(db, "interest-image/");
      onValue(interestImgRef, (snapshot) => {
        interestImg.value = snapshot.val();
      });
    });
    return {
      csp,
      editAccess,
      handleEditCSP,
      avail_DateTime,
      interestImg,
      ownerInfo,
      appliedDateTime,
      handleApply,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.cspContent {
  text-align: left;
}

.interest-img {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}
</style>
