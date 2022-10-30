<template>
  <div class="container-xl px-4 mt-4 py-5">
    <div class="col-xl-8 mx-auto my-auto">
      <!-- Account details card-->
      <div class="card mb-4 profile-all">
        <div class="card-header">Create Your CSP</div>
        <div class="card-body">
          <form>
            <!-- Form Group (username)-->
            <div class="row gx-3 mb-3 edit-title">
              <!-- Form Group (first name)-->
              <div class="col-md-6">
                <label class="small mb-1" for="name">CSP Name</label>
                <input
                  class="form-control"
                  id="name"
                  type="text"
                  placeholder="What is your CSP called?"
                  v-model="createCsp.name"
                />
              </div>
              <!-- Form Group (last name)-->
              <div class="col-md-6">
                <label class="small mb-1 edit-title" for="csp_hours"
                  >Project Hours</label
                >
                <input
                  class="form-control"
                  id="csp_hours"
                  type="number"
                  placeholder="How many hours is your project?"
                  v-model="createCsp.csp_hours"
                />
              </div>
            </div>
            <div class="row gx-3 mb-3 edit-title">
              <!-- Form Group (first name)-->
              <div class="col-md-6">
                <label for="cspLocation" class="form-label small mb-1"
                  >CSP Location</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="cspLocation"
                  placeholder="Please enter the full address of your CSP"
                  v-model="location.address"
                />
              </div>
              <div class="col-md-6">
                <label for="cspLocation" class="form-label small mb-1"
                  >CSP Start Date</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="startDate"
                  v-model="createCsp.date_start"
                />
                <label for="cspLocation" class="form-label small mb-1"
                  >CSP End Date</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="endDate"
                  v-model="createCsp.date_end"
                />
              </div>
            </div>
            <div class="row mb-3 edit-title">
              <label for="description" class="form-label small mb-1"
                >Project Description</label
              >
              <textarea
                type="email"
                class="form-control"
                id="description"
                rows="3"
                placeholder="How would you describe your CSP?"
                v-model="createCsp.description"
              ></textarea>
            </div>
            <div class="row">
              <label for="cspLocation" class="form-label small mb-1"
                >Interview Start Date</label
              >
              <input type="date" class="form-control" id="startDate" />
              <label for="cspLocation" class="form-label small mb-1"
                >Interview End Date</label
              >
              <input type="date" class="form-control" id="endDate" />
              <label for="interviewStart" class="form-label small mb-1">
                Interview Start Time
              </label>
              <input type="time" id="interviewStart" />
              <label for="interviewEnd" class="form-label small mb-1">
                Interview End Time
              </label>
              <input type="time" id="interviewEnd" />
              <label for="intervieweesPerHour">Interviews per Hour</label>
              <input
                type="number"
                id="intervieweesPerHour"
                placeholder="Interviews to conduct per hour"
                v-model="createCsp.no_of_interviews_per_hour"
              />
            </div>
            <div class="edit-title">
              <label for="editInterest" class="form-label edit-title">
                Project Category
              </label>
            </div>
            <div
              v-for="interest_tag in interest_tags"
              :key="interest_tag"
              class="align-items-left form-check form-check-inline small mb-2"
            >
              <label :for="interest_tag" class="form-check-label small mb-1">{{
                interest_tag
              }}</label>
              <input
                type="checkbox"
                :id="interest_tag"
                class="form-check-input"
                :value="interest_tag"
                v-model="createCsp.interest"
              />
            </div>
            <!-- Form Row-->
            <div class="row gx-3 mb-3 edit-title mt-2">
              <!-- Form Group (phone number)-->
              <div class="col-md-6">
                <label for="image" class="form-label small mb-1"
                  >Upload A Primary Image</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  @change="handleCoverImg"
                />
              </div>
              <!-- Form Group (phone number)-->
              <div class="col-md-6">
                <label for="image2" class="form-label small mb-1"
                  >Upload A Secondary Image</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="image2"
                  multiple
                  @change="handlePhotos"
                />
              </div>
            </div>
            <!-- Save changes button-->
            <button
              type="submit"
              class="btn btn-primary mt-2 w-100"
              @click.prevent="handleCreate"
            >
              List It!
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { getDatabase, ref as dbRefe, onValue, get } from "firebase/database";
import { useStore } from "vuex";
export default {
  setup() {
    const db = getDatabase();
    const store = useStore();
    const user = computed(() => store.getters.user);
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
    return {
      location,
      interest_tags,
      createCsp,
      handleCreate,
      handleCoverImg,
      handlePhotos,
      interviews,
    };
  },
};
</script>
