<template>
  <div class="container px-4 pb-4 col-8 editcsp">
    <div>
      <div class="nav nav-tabs py-2" id="nav-tab" role="tablist">
        <button
          class="editcsptab active"
          id="nav-home-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-home"
          type="button"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >
          1. CSP Info
        </button>
        <button
          class="editcsptab"
          id="nav-profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-profile"
          type="button"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
        >
          2. Interview Details
        </button>
      </div>
    </div>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <div class="my-3 edit-title">
          <label for="name" class="form-label">Name of CSP:</label>
          <input type="text" class="form-control" v-model="editedCsp.name" />
        </div>

        <!-- Form Row-->
        <div class="row gx-3 mb-3 edit-title">
          <!-- Form Group (first name)-->
          <div class="col-md-6">
            <label for="name" class="form-label">Address of CSP:</label>
            <input
              type="text"
              class="form-control"
              id="cspLocation"
              v-model="address"
            />
          </div>
          <!-- Form Group (last name)-->
          <div class="col-md-6">
            <label for="hours" class="form-label">No of Hours:</label>
            <input
              type="number"
              class="form-control"
              v-model="editedCsp.csp_hours"
            />
          </div>
        </div>

        <div class="mb-3 edit-title">
          <label for="description" class="form-label"
            >Project Description:</label
          >
          <textarea
            rows="4"
            class="form-control"
            v-model="editedCsp.description"
          ></textarea>
        </div>

        <div class="mb-3 edit-title">
          <div class="row">
            <label for="interest" class="form-label">Project Category:</label>
          </div>
          <div
            v-for="interest_tag in interest_tags"
            :key="interest_tag"
            class="align-items-left form-check form-check-inline small mb-2"
          >
            <label :for="interest_tag" class="form-check-label small try mb-1"
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

        <!-- Form Row-->
        <div class="row gx-3 mb-3 edit-title">
          <!-- Form Group (first name)-->
          <div class="col-md-6">
            <label for="dateStart" class="form-label">CSP Start Date:</label>
            <input
              type="date"
              class="form-control"
              v-model="editedCsp.date_start"
            />
          </div>
          <!-- Form Group (last name)-->
          <div class="col-md-6">
            <label for="dateEnd" class="form-label">CSP End Date:</label>
            <input
              type="date"
              class="form-control"
              v-model="editedCsp.date_end"
            />
          </div>
        </div>

        <!-- Form Row-->
        <div class="row gx-3 mb-3 edit-title">
          <!-- Form Group (first name)-->
          <div class="col-md-6">
            <label for="coverimg" class="form-label">Update Cover Image:</label>
            <input type="file" class="form-control" @change="handleCoverImg" />
          </div>
          <!-- Form Group (last name)-->
          <div class="col-md-6">
            <label for="addonphoto" class="form-label">Add More Photos:</label>
            <input type="file" class="form-control" @change="handlePhotos" />
          </div>
        </div>
      </div>

      <div
        class="tab-pane fade"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <!-- Form Row-->
        <div class="row gx-3 my-3 edit-title">
          <!-- Form Group (first name)-->
          <div class="col-md-6">
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
          <!-- Form Group (last name)-->
          <div class="col-md-6">
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

        <!-- Form Row-->
        <div class="row gx-3 mb-3 edit-title">
          <!-- Form Group (first name)-->
          <div class="col-md-6">
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
          <!-- Form Group (last name)-->
          <div class="col-md-6">
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

        <!-- Form Row-->
        <div class="row gx-3 mb-3 edit-title">
          <!-- Form Group (first name)-->
          <div class="col-md-6">
            <label for="interviewSlotsPerHour" class="form-label"
              >No of person per interview timeslot:</label
            >
            <input
              type="number"
              class="form-control"
              v-model="editedCsp.no_of_interviews_per_hour"
            />
          </div>
        </div>
        <button class="btn btn-primary" @click="handleEditCsp">
          Submit Edits
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { getDatabase, ref as dbRefe, get, update } from "firebase/database";
import { onBeforeMount, ref, onMounted } from "vue";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as stRefe,
  uploadBytes,
} from "firebase/storage";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const storage = getStorage();
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
      // update cover image if got changes (delete current cover image first)
      if (updatedImg.value.cover_image != null) {
        const curr_cover_url = editedCsp.value.cover_image;
        const deleteRef = stRefe(storage, curr_cover_url);
        await deleteObject(deleteRef);
        console.log("deleted cover image");
        const addImgRef = stRefe(
          storage,
          `csp/${route.params.id}/${updatedImg.value.cover_image.name}`
        );
        await uploadBytes(addImgRef, updatedImg.value.cover_image);
        editedCsp.value.cover_image = await getDownloadURL(addImgRef);
      }
      // add additional photos into db and storage if have
      if (updatedImg.value.photos.length != 0) {
        const addPhotosRef = stRefe(storage, `csp/${route.params.id}`);
        for (let i = 0; i < updatedImg.value.photos.length; i++) {
          const photoRef = stRefe(
            addPhotosRef,
            updatedImg.value.photos[i].name
          );
          await uploadBytes(photoRef, updatedImg.value.photos[i]);
          editedCsp.value.photos.push(await getDownloadURL(photoRef));
        }
      }
      // increase the amount of dates for availability
      const date_avail = {};
      const date_start = new Date(interviewTimings.value.startDate);
      while (date_start <= new Date(interviewTimings.value.endDate)) {
        const timing = [];
        const start_hr = parseInt(interviewTimings.value.startTime.slice(0, 2));
        const end_hr = parseInt(interviewTimings.value.endTime.slice(0, 2));
        const start_end_min = interviewTimings.value.startTime.slice(3, 5);
        for (let i = start_hr; i < end_hr; i++) {
          timing.push(`${i}${start_end_min}hrs`);
        }
        date_avail[date_start.toJSON().slice(0, 10)] = timing;
        date_start.setDate(date_start.getDate() + 1);
      }
      // store editedCSP into db (update)
      const cspRef = dbRefe(db, `csp/${route.params.id}`);
      await update(cspRef, editedCsp.value);
      console.log("updated csp", editedCsp.value);
      // store availability into db (update)
      const availRef = dbRefe(
        db,
        `availability/${route.params.id}/dates_avail`
      );
      await update(availRef, date_avail);
      console.log("updated availability", date_avail);
      // route back to csp page
      router.push(`/csp/${route.params.id}`);
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
