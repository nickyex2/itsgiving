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
                  placeholder="Where will your CSP be conducted?"
                  ref="autocompleteaddress"
                  v-model="autocompleteaddress"
                />
              </div>
              <div class="col-md-6">
                <label for="cspLocation" class="form-label small mb-1"
                  >CSP Date</label
                >
                <input type="date" class="form-control" id="cspDate" />
              </div>
            </div>
            <div class="mb-3 edit-title">
              <label for="description" class="form-label small mb-1"
                >Email address</label
              >
              <textarea
                type="email"
                class="form-control"
                id="description"
                rows="3"
                placeholder="How would you describe your CSP?"
              ></textarea>
            </div>
            <div class="edit-title">
              <label for="editInterest" class="form-label edit-title">
                Project Cateogry
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
              />
            </div>
            <!-- Form Row-->
            <div class="row gx-3 mb-3 edit-title mt-2">
              <!-- Form Group (phone number)-->
              <div class="col-md-6">
                <label for="image" class="form-label small mb-1"
                  >Upload A Primary Image</label
                >
                <input type="file" class="form-control" id="image" />
              </div>
              <!-- Form Group (phone number)-->
              <div class="col-md-6">
                <label for="image2" class="form-label small mb-1"
                  >Upload A Secondary Image</label
                >
                <input type="file" class="form-control" id="image2" />
              </div>
            </div>
            <!-- Save changes button-->
            <button type="submit" class="btn btn-primary mt-2 w-100">
              List It!
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      interest_tags: [
        "Animal Welfare",
        "Arts & Heritage",
        "Children & Youth",
        "Community",
        "Disability",
        "Education",
        "Elderly",
        "Environment",
        "Families",
        "Health",
        "Humanitarian",
        "Social Services",
        "Sports",
        "Women & Girls",
      ],
      lng: 0,
      lat: 0,
      autocompleteaddress: "",
    };
  },
  mounted() {
    const autocompleteaddress = new window.google.maps.places.Autocomplete(
      this.$refs["autocompleteaddress"],
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(1.29027, 103.851959)
        ),
      }
    );

    autocompleteaddress.addListener("place_changed", () => {
      const place = autocompleteaddress.getPlace();
      this.address = place.formatted_address;
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
    });
  },
};
</script>
