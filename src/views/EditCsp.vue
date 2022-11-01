<template>
  <div class="container-fluid mt-5 mb-5">
    <h1>this is edit csp page</h1>
    <div class="row mb-2">
      <div class="col-6">
        <label for="name" class="form-label">Name of CSP:</label>
        <input type="text" class="form-control" v-model="editedCsp.name" />
      </div>
      <div class="col-6">
        <label for="name" class="form-label">Address of CSP:</label>
        <input
          type="text"
          class="form-control"
          id="cspLocation"
          v-model="address"
        />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-6">
        <label for="description" class="form-label">Project Description:</label>
        <textarea
          rows="4"
          class="form-control"
          v-model="editedCsp.description"
        ></textarea>
      </div>
      <div class="col-6">
        <div class="row">
          <label for="interest" class="form-label">Project Category:</label>
        </div>
        <div
          v-for="interest_tag in interest_tags"
          :key="interest_tag"
          class="align-items-left form-check form-check-inline small mb-2"
        >
          <label :for="interest_tag" class="form-check-label small mb-1"
            >{{ interest_tag }}
          </label>
          <input
            type="checkbox"
            :id="interest_tag"
            class="form-check-input"
            :value="interest_tag"
            v-model="editedCsp.interest"
          />
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-4">
        <label for="hours" class="form-label">No of Hours:</label>
        <input
          type="number"
          class="form-control"
          v-model="editedCsp.csp_hours"
        />
      </div>
      <div class="col-4">
        <label for="dateStart" class="form-label">CSP Start Date:</label>
        <input
          type="date"
          class="form-control"
          v-model="editedCsp.date_start"
        />
      </div>
      <div class="col-4">
        <label for="dateEnd" class="form-label">CSP End Date:</label>
        <input type="date" class="form-control" v-model="editedCsp.date_end" />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-6">
        <label for="coverimg" class="form-label">Update Cover Image:</label>
        <input type="file" class="form-control" @change="handleCoverImg" />
      </div>
      <div class="col-6">
        <label for="addonphoto" class="form-label">Add More Photos:</label>
        <input type="file" class="form-control" @change="handlePhotos" />
      </div>
    </div>
    <div class="row mb-2">
      <label for="interview">Add More Dates for Interviews</label>
      <div class="col-6">
        <div class="row">
          <label for="interviewStartDate" class="form-label"
            >Interview Start Date:</label
          >
          <input
            type="date"
            class="form-control"
            v-model="interviewTimings.startDate"
            disabled
          />
        </div>
        <div class="row">
          <label for="interviewEndDate" class="form-label"
            >Interview End Date:</label
          >
          <input
            type="date"
            class="form-control"
            v-model="interviewTimings.endDate"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <label for="interviewStartTime" class="form-label"
            >Interview Start Time:</label
          >
          <input
            type="time"
            class="form-control"
            v-model="interviewTimings.startTime"
            disabled
          />
        </div>
        <div class="row">
          <label for="interviewEndTime" class="form-label"
            >Interview End Time:</label
          >
          <input
            type="time"
            class="form-control"
            v-model="interviewTimings.endTime"
            disabled
          />
        </div>
      </div>
    </div>
    <button class="btn btn-primary" @click="handleEditCsp">Submit Edits</button>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { getDatabase, ref as dbRefe, get } from "firebase/database";
import { onBeforeMount, ref, onMounted } from "vue";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const db = getDatabase();
    if (route.query.edit != "true") {
      router.push(`/csp/${route.params.id}`);
    }
    const editedCsp = ref({});
    // variable is just here to remove rendering error
    const address = ref("");
    const interest_tags = ref([]);
    const updatedImg = ref({
      cover_image: null,
      photos: [],
    });
    const handleCoverImg = (e) => {
      updatedImg.value.cover_image = e.target.files[0];
      console.log(updatedImg.value.cover_image);
    };
    const handlePhotos = (e) => {
      updatedImg.value.photos = e.target.files;
      console.log(updatedImg.value.photos);
    };
    const interviewTimings = ref({
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
    });
    // TODO the logic for the button pressed
    const handleEditCsp = async () => {
      console.log(editedCsp.value);
    };
    // before mount
    onBeforeMount(async () => {
      const cspRef = dbRefe(db, `csp/${route.params.id}`);
      await get(cspRef).then((snapshot) => {
        if (snapshot.exists()) {
          editedCsp.value = snapshot.val();
        } else {
          console.log("No data available");
        }
      });
      console.log(editedCsp.value);
      address.value = editedCsp.value.location.address;
      const interestRef = dbRefe(db, "interest-tags/");
      await get(interestRef).then((snapshot) => {
        if (snapshot.exists()) {
          interest_tags.value = snapshot.val();
        } else {
          console.log("No data available");
        }
      });
      // getting interview start date and end date and start time and end time
      const dateAvailRef = dbRefe(
        db,
        `availability/${route.params.id}/dates_avail`
      );
      await get(dateAvailRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          interviewTimings.value.startDate = Object.keys(data)[0];
          interviewTimings.value.endDate =
            Object.keys(data)[Object.keys(data).length - 1];
          interviewTimings.value.startTime = `${data[
            interviewTimings.value.startDate
          ][0].slice(0, 2)}:${data[interviewTimings.value.startDate][0].slice(
            2,
            4
          )}`;
          interviewTimings.value.endTime = `${data[
            interviewTimings.value.startDate
          ][data[interviewTimings.value.startDate].length - 1].slice(
            0,
            2
          )}:${data[interviewTimings.value.startDate][
            data[interviewTimings.value.startDate].length - 1
          ].slice(2, 4)}`;
        } else {
          console.log("No data available");
        }
      });
    });
    // on mount
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
        editedCsp.value.location.lat = place.geometry.location.lat();
        editedCsp.value.location.lng = place.geometry.location.lng();
        editedCsp.value.location.address = place.formatted_address;
      });
    });
    return {
      editedCsp,
      address,
      interest_tags,
      updatedImg,
      handleCoverImg,
      handlePhotos,
      interviewTimings,
      handleEditCsp,
    };
  },
};
</script>
<style></style>
