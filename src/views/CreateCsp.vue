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
                <button class="firstNext next" v-show="showFirstNext">
                  Next
                </button>
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
                  :min="today"
                  v-model="createCsp.date_start"
                />
              </div>
              <div class="col p-0 endd">
                <div class="label">CSP End Date</div>
                <input
                  type="date"
                  class="form-control"
                  id="endDate"
                  :min="createCsp.date_start"
                  v-model="createCsp.date_end"
                />
              </div>
            </div>
            <div class="field btns">
              <button class="prev-1 prev">Previous</button>
              <button class="next-1 next" v-show="showSecondNext">Next</button>
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
                  :min="today"
                  v-model="interviews.startDate"
                />
              </div>
              <div class="col p-0 endd">
                <div class="label">Interview End Date</div>
                <input
                  type="date"
                  class="form-control"
                  id="endDate"
                  :min="interviews.startDate"
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
              <button class="next-2 next" v-show="showThirdNext">Next</button>
            </div>
          </div>
          <div class="page">
            <div class="title">Profile Pic:</div>
            <div class="field">
              <div class="label">Upload Cover Image:</div>
              <input
                type="file"
                class="form-control"
                id="image"
                @change="handleCoverImg"
              />
            </div>
            <div class="field">
              <div class="label">Upload Photos:</div>
              <input
                type="file"
                class="form-control"
                id="image2"
                multiple
                @change="handlePhotos"
              />
            </div>
            <div class="field text-center">
              <p class="fw-bold text-danger" v-if="errBool">{{ err }}</p>
            </div>
            <div class="field btns">
              <button class="prev-3 prev">Previous</button>
              <button
                type="submit"
                class="btn btn-primary mt-2 w-100"
                @click.prevent="handleCreate"
                v-show="showListBtn"
              >
                List It!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import {
  getDatabase,
  ref as dbRefe,
  onValue,
  get,
  set,
  update,
} from "firebase/database";
import { useStore } from "vuex";
import {
  getStorage,
  ref as stRefe,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "vue-router";

export default {
  setup() {
    const db = getDatabase();
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters.user);
    const userAddInfo = computed(() => store.getters.userAddInfo);
    if (!user.value) {
      router.push("/login");
    } else if (!userAddInfo.value) {
      router.push("/setup?edit=true");
    }
    const err = ref("");
    const errBool = ref(false);
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
    const selected_img = ref({
      cover_image: null,
      photos: [],
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
    const today = ref(new Date().toJSON().slice(0, 10));
    const interest_tags = ref([]);
    const dbRef = dbRefe(db, "interest-tags/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      for (let key in data) {
        interest_tags.value.push(data[key]);
      }
    });
    const handleCoverImg = (e) => {
      selected_img.value.cover_image = e.target.files[0];
    };
    const handlePhotos = (e) => {
      selected_img.value.photos = e.target.files;
    };
    const handleCreate = async () => {
      // gets today's date and store in date_created
      if (
        new Date(createCsp.value.date_start).getTime() <=
          new Date(today.value).getTime() ||
        new Date(createCsp.value.date_end).getTime() <=
          new Date(today.value).getTime()
      ) {
        err.value = "Error: Start/End date cannot be before today's date";
        errBool.value = true;
      } else {
        createCsp.value.date_created = today.value;
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
        // TODO
        // store images into firebase and get the url and store in createCsp
        const storage = getStorage();
        const coverImgRef = stRefe(
          storage,
          `csp/${cid.value}/${selected_img.value.cover_image.name}`
        );
        await uploadBytes(coverImgRef, selected_img.value.cover_image);
        await getDownloadURL(coverImgRef).then((url) => {
          createCsp.value.cover_image = url;
        });
        for (let i = 0; i < selected_img.value.photos.length; i++) {
          const photoRef = stRefe(
            storage,
            `csp/${cid.value}/${selected_img.value.photos[i].name}`
          );
          await uploadBytes(photoRef, selected_img.value.photos[i]);
          await getDownloadURL(photoRef).then((url) => {
            createCsp.value.photos.push(url);
          });
        }
        // create the date stuff for availability
        const date_avail = {};
        const date_start = new Date(interviews.value.startDate);
        while (date_start <= new Date(interviews.value.endDate)) {
          const timing = [];
          const start_hr = parseInt(interviews.value.startTime.slice(0, 2));
          const end_hr = parseInt(interviews.value.endTime.slice(0, 2));
          const start_end_min = interviews.value.startTime.slice(3, 5);
          for (let i = start_hr; i <= end_hr; i++) {
            if (i < 10) {
              timing.push(`0${i}${start_end_min}hrs`);
            } else {
              timing.push(`${i}${start_end_min}hrs`);
            }
          }
          date_avail[date_start.toJSON().slice(0, 10)] = timing;
          date_start.setDate(date_start.getDate() + 1);
        }
        // store createCsp into csp table of firebase
        const cspRef = dbRefe(db, `csp/${cid.value}`);
        await set(cspRef, createCsp.value);
        // store availability into availability table of firebase
        const availRef = dbRefe(db, `availability/${cid.value}/dates_avail`);
        await set(availRef, date_avail);
        const data = ref({});
        const userRef = dbRefe(db, `users/${user.value.uid}`);
        await get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            data.value = snapshot.val();
            if (data.value.projectLead) {
              data.value.projectLead.push(cid.value);
            } else {
              data.value.projectLead = [cid.value];
            }
            data.value.hours += parseInt(createCsp.value.csp_hours);
            update(userRef, data.value);
          }
        });
        await store.dispatch("setUserAddInfo", user.value.uid);
        // redirect to csp page
        router.push(`/csp/${cid.value}`);
      }
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
      });
    });
    const showFirstNext = computed(() => {
      if (
        createCsp.value.name != "" &&
        createCsp.value.description != "" &&
        createCsp.value.interest.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    });
    const showSecondNext = computed(() => {
      if (
        location.value.address != "" &&
        createCsp.value.csp_hours != "" &&
        createCsp.value.date_start != "" &&
        createCsp.value.date_end != ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    const showThirdNext = computed(() => {
      if (
        createCsp.value.no_of_interviews_per_hour != "" &&
        interviews.value.startDate != "" &&
        interviews.value.endDate != "" &&
        interviews.value.startTime != "" &&
        interviews.value.endTime != ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    const showListBtn = computed(() => {
      if (
        selected_img.value.cover_image != null &&
        selected_img.value.photos.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    });
    return {
      location,
      interest_tags,
      createCsp,
      err,
      errBool,
      today,
      handleCreate,
      handleCoverImg,
      handlePhotos,
      interviews,
      selected_img,
      showFirstNext,
      showSecondNext,
      showThirdNext,
      showListBtn,
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
