<template>
  <video autoplay muted loop id="loginvid" style="position: fixed">
    <source src="../assets/login.mp4" type="video/mp4" />
  </video>

  <div class="container-fluid d-flex justify-content-center createcsp">
    <div class="container-prof">
      <header>Create CSP</header>
      <div class="progress-bar">
        <div class="step">
          <p>Name</p>
          <div class="bullet">
            <span>1</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Details</p>
          <div class="bullet">
            <span>2</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Interview</p>
          <div class="bullet">
            <span>3</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Pictures</p>
          <div class="bullet">
            <span>4</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
      </div>
      <div class="form-outer">
        <form action="#">
          <div class="page slide-page">
            <div class="container temp">
              <div class="title">Basic Info:</div>
              <div class="field">
                <div class="label">CSP Name</div>
                <input
                  class="form-control"
                  id="name"
                  type="text"
                  placeholder="What is your CSP called?"
                  v-model="createCsp.name"
                />
              </div>
              <div class="field">
                <div class="label">CSP Description</div>
                <textarea
                  type="email"
                  class="form-control"
                  id="description"
                  rows="3"
                  placeholder="How would you describe your CSP?"
                  v-model="createCsp.description"
                ></textarea>
              </div>
              <div class="field">
                <div class="label">Project Category (at least 1):</div>
                <div class="container">
                  <div
                    v-for="interest_tag in interest_tags"
                    :key="interest_tag"
                    class="align-items-left form-check form-check-inline small mb-2"
                  >
                    <label
                      :for="interest_tag"
                      class="form-check-label small mb-1 checkbox-label-2"
                      >{{ interest_tag }}</label
                    >
                    <input
                      type="checkbox"
                      :id="interest_tag"
                      class="form-check-input"
                      :value="interest_tag"
                      v-model="createCsp.interest"
                    />
                  </div>
                </div>
              </div>
              <div class="field">
                <button class="firstNext next">Next</button>
              </div>
            </div>
          </div>
          <div class="page">
            <div class="title">Contact Info:</div>
            <div class="field">
              <div class="label">Location</div>
              <input
                type="text"
                class="form-control"
                id="cspLocation"
                placeholder="Please enter the full address of your CSP"
                v-model="location.address"
              />
            </div>
            <div class="field">
              <div class="label">Total Hours</div>
              <input
                class="form-control"
                id="csp_hours"
                type="number"
                placeholder="How many hours is your project?"
                v-model="createCsp.csp_hours"
              />
            </div>
            <div class="row-cols-2 field">
              <div class="col p-0 startd">
                <div class="label">CSP Start Date</div>
                <input
                  type="date"
                  class="form-control"
                  id="startDate"
                  v-model="createCsp.date_start"
                />
              </div>
              <div class="col p-0 endd">
                <div class="label">CSP End Date</div>
                <input
                  type="date"
                  class="form-control"
                  id="endDate"
                  v-model="createCsp.date_end"
                />
              </div>
            </div>
            <div class="field btns">
              <button class="prev-1 prev">Previous</button>
              <button class="next-1 next">Next</button>
            </div>
          </div>
          <div class="page">
            <div class="title">Interview Info:</div>
            <div class="row-cols-2 field">
              <div class="col p-0 startd">
                <div class="label">Interview Start Date</div>
                <input
                  type="date"
                  class="form-control"
                  id="startDate"
                  v-model="interviews.startDate"
                />
              </div>
              <div class="col p-0 endd">
                <div class="label">Interview End Date</div>
                <input
                  type="date"
                  class="form-control"
                  id="endDate"
                  v-model="interviews.endDate"
                />
              </div>
            </div>

            <div class="row field">
              <div class="col p-0 startd">
                <div class="label">Interview Start Time</div>
                <input
                  type="time"
                  id="interviewStart"
                  v-model="interviews.startTime"
                />
              </div>
              <div class="col p-0 endd">
                <div class="label">Interview End Time</div>
                <input
                  type="time"
                  id="interviewEnd"
                  v-model="interviews.endTime"
                />
              </div>
            </div>
            <div class="field">
              <div class="label">Interviews per hour</div>
              <input
                type="number"
                id="intervieweesPerHour"
                placeholder="Interviews to conduct per hour"
                v-model="createCsp.no_of_interviews_per_hour"
              />
            </div>
            <div class="field btns">
              <button class="prev-2 prev">Previous</button>
              <button class="next-2 next">Next</button>
            </div>
          </div>
          <div class="page">
            <div class="title">Profile Pic:</div>
            <div class="field">
              <div class="label">Upload Primary Image:</div>
              <input
                type="file"
                class="form-control"
                id="image"
                @change="handleCoverImg"
              />
            </div>
            <div class="field">
              <div class="label">Upload Secondary Image:</div>
              <input
                type="file"
                class="form-control"
                id="image2"
                multiple
                @change="handlePhotos"
              />
            </div>
            <div class="field btns">
              <button class="prev-3 prev">Previous</button>
              <button
                type="submit"
                class="btn btn-primary mt-2 w-100"
                @click.prevent="handleCreate"
              >
                List It!
              </button>
              <!-- <button class="submit" @click.prevent="handleSetup">
                Submit
              </button> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { getDatabase, ref as dbRefe, onValue, get } from "firebase/database";
import { useStore } from "vuex";
// import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const db = getDatabase();
    const store = useStore();
    const user = computed(() => store.getters.user);
    // const router = useRouter();
    // const route = useRoute();
    // if (route.query.edit != "true") {
    //   router.push("");
    // }
    const createCsp = ref({
      name: "",
      csp_hours: "",
      date_created: "",
      date_start: "",
      date_end: "",
      description: "",
      no_of_interviews_per_hour: "",
      interest: [],
      cover_image: "",
      photos: [],
      link: "",
      owner: "",
      owner_email: "",
      owner_uid: "",
    });
    const cid = ref("");
    const location = ref({
      lat: 0,
      lng: 0,
      address: "",
    });
    const interviews = ref({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
    const interest_tags = ref([]);
    const dbRef = dbRefe(db, "interest-tags/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      for (let key in data) {
        interest_tags.value.push(data[key]);
      }
    });
    const handleCoverImg = (e) => {
      createCsp.value.cover_image = e.target.files[0];
    };
    const handlePhotos = (e) => {
      createCsp.value.photos = e.target.files;
    };
    const handleCreate = async () => {
      // gets today's date and store in date_created
      const today = new Date().toJSON().slice(0, 10);
      console.log(today);
      createCsp.value.date_created = today;
      // create link with cid and store in link
      const dbRef = dbRefe(db, "csp/");
      await get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          cid.value = `csp${snapshot.size + 1}`;
          createCsp.value.link = `https://its-giving.netlify.app/csp/${cid.value}`;
        } else {
          cid.value = `csp1`;
          createCsp.value.link = `https://its-giving.netlify.app/csp/${cid.value}`;
        }
      });
      // get values from user and assign to createCsp
      createCsp.value.owner = user.value.displayName;
      createCsp.value.owner_email = user.value.email;
      createCsp.value.owner_uid = user.value.uid;
      // add location object to createCsp
      createCsp.value.location = location.value;
      console.log(createCsp.value.location);
      // TODO
      // store images into firebase and get the url and store in createCsp
      // create the date stuff for availability
      // store createCsp into csp table of firebase
      // store availability into availability table of firebase
      // store cid into user's table (projectLead) of firebase and update the store
      // redirect to csp page
      console.log(createCsp.value);
    };
    onMounted(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("cspLocation"),
        {
          bounds: new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(1.29027, 103.851959)
          ),
        }
      );
      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();
        location.value.lat = place.geometry.location.lat();
        location.value.lng = place.geometry.location.lng();
        location.value.address = place.formatted_address;
        console.log(location.value);
      });
    });
    // const showThirdNext = computed(() => {
    //   if (createCsp.value.interest.length > 0) {
    //     return "d-none";
    //   } else {
    //     return "";
    //   }
    // });
    // const showFirstNext = computed(() => {
    //   if (createCsp.value.name != "" && createCsp.value.description != "") {
    //     return "d-none";
    //   } else {
    //     return "";
    //   }
    // });
    // const showSecondNext = computed(() => {
    //   if (
    //     createCsp.value.phoneNo != "" &&
    //     createCsp.value.telegramHandle != "@"
    //   ) {
    //     return "d-none";
    //   } else {
    //     return "";
    //   }
    // });
    return {
      location,
      interest_tags,
      createCsp,
      handleCreate,
      handleCoverImg,
      handlePhotos,
      interviews,
      // showFirstNext,
      // showSecondNext,
      // showThirdNext,
    };
  },
  mounted() {
    const slidePage = document.querySelector(".slide-page");
    const nextBtnFirst = document.querySelector(".firstNext");
    const prevBtnSec = document.querySelector(".prev-1");
    const nextBtnSec = document.querySelector(".next-1");
    const prevBtnThird = document.querySelector(".prev-2");
    const nextBtnThird = document.querySelector(".next-2");
    const prevBtnFourth = document.querySelector(".prev-3");
    // const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    // const router = useRouter();
    let current = 1;
    nextBtnFirst.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-25%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    nextBtnSec.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-50%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    nextBtnThird.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-75%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    // submitBtn.addEventListener("click", function () {
    //   bullet[current - 1].classList.add("active");
    //   progressCheck[current - 1].classList.add("active");
    //   progressText[current - 1].classList.add("active");
    //   current += 1;
    //   setTimeout(function () {
    //     alert("Your Form Successfully Signed up");
    //     router.push("/");
    //   }, 800);
    // });
    prevBtnSec.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "0%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
    prevBtnThird.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-25%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
    prevBtnFourth.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-50%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
  },
};
</script>
