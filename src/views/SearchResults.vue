<template>
  <br />
  <br />
  <br />
  <br />
  <br />
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-5 searchbar d-flex justify-content-left">
            <input
              class="form-control h-100"
              type="text"
              v-model="search"
              placeholder="Got a Specific Project In Mind?"
              ref=""
            />
          </div>
          <div class="col-5 d-flex justify-content-left">
            <input
              class="form-control h-100"
              v-model="autocompleteaddress"
              placeholder="Alternatively Enter Your Address"
              ref="autocomplete"
            />
          </div>
          <div class="col-1 form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckChecked"
              >Show Map</label
            >
            <br />
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              v-model="checked"
              @change="toggleMap"
            />
          </div>
          <div class="col-1" v-if="gridLayout">
            <button
              class="btn rounded-circle float-right"
              @click="gridLayout = !gridLayout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                fill="currentColor"
                class="bi bi-list-ul"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                />
              </svg>
            </button>
          </div>
          <div class="col-1" v-else>
            <button
              class="btn rounded-circle float-right"
              @click="gridLayout = !gridLayout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                fill="currentColor"
                class="bi bi-grid-3x2-gap"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 4v2H2V4h2zm1 7V9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 5V9a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 4v2H7V4h2zm5 0h-2v2h2V4zM4 9v2H2V9h2zm5 0v2H7V9h2zm5 0v2h-2V9h2zm-3-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div :class="showMap ? breakCol : dontBreak">
        <div class="album py-2">
          <!--div class="album py-5 bg-light"-->
          <div class="container px-0">
            <!-- change here -->
            <div
              :class="showMap ? dontArrange : arrangeCards"
              v-if="gridLayout"
            >
              <!--div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"-->
              <div v-for="csp in filteredList" :key="csp.id">
                <div class="col">
                  <div class="card shadow-sm zoom" style="border-radius: 12px">
                    <div class="img_align">
                      <img
                        class="w-100 p-0"
                        height="225"
                        :src="csp.image"
                        style="
                          border-top-left-radius: 12px;
                          border-top-right-radius: 12px;
                        "
                      />
                      <div class="text_align d-flex">
                        <h4>{{ csp.openings }}&nbsp;</h4>
                        <small style="line-height: 32px">Openings</small>
                      </div>
                    </div>
                    <div class="card-body px-3">
                      <h3 style="text-align: left">{{ csp.name }}</h3>
                      <div class="parent">
                        <span clas="child" v-for="tag in csp.cat" :key="tag">
                          <span
                            class="badge rounded-pill bg-secondary me-2"
                            style="font-size: 0.7rem"
                            >{{ tag }}</span
                          >
                        </span>
                      </div>
                      <p style="text-align: left" class="mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-clock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                          /></svg
                        >&nbsp;&nbsp;Estimated: {{ csp.hours }} Hours
                      </p>
                      <p style="text-align: left">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pin-map-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                          /></svg
                        >&nbsp; {{ shortenAddress(csp.address) }}
                      </p>
                      <p style="text-align: left" class="card-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-file-earmark-text-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                          />
                        </svg>
                        &nbsp;{{ csp.description }}
                      </p>
                      <div class="d-flex justify-content-center">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <!--div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"-->
              <div
                class="list-group"
                v-for="csp in filteredList"
                :key="csp.id"
                style="border-radius: 12px"
              >
                <a
                  href="#"
                  class="list-group-item list-group-item-action flex-column align-items-start mb-2 card zoom p-2"
                  style="height: 250px; width: 100%"
                >
                  <span class="d-flex align-left h-100 position-relative">
                    <img
                      :src="csp.image"
                      :class="showMap ? hideImage : showImage"
                      style="border-radius: 12px"
                    />
                    <div
                      class="d-block ps-3"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        max-width: 60%;
                        min-width: 60%;
                      "
                    >
                      <h2 style="text-align: left">{{ csp.name }}</h2>
                      <div class="parent">
                        <span clas="child" v-for="tag in csp.cat" :key="tag">
                          <span
                            class="badge rounded-pill bg-secondary me-2 mb-2"
                            style="font-size: 1rem"
                            >{{ tag }}</span
                          >
                        </span>
                      </div>
                      <p style="text-align: left" class="mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-clock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                          /></svg
                        >&nbsp;&nbsp;Estimated: {{ csp.hours }} Hours
                      </p>
                      <p
                        style="text-align: left"
                        class="text-truncate d-none d-sm-block"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pin-map-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                          /></svg
                        >&nbsp; {{ csp.address }}
                      </p>
                      <p
                        style="text-align: left"
                        class="card-text d-none d-lg-block text-truncate"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-file-earmark-text-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                          />
                        </svg>
                        &nbsp;{{ csp.description }}
                      </p>
                    </div>
                    <div
                      class="btn-group"
                      style="
                        position: absolute;
                        top: 0;
                        right: 0;
                        min-height: 100%;
                      "
                    >
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        style="border-radius: 12px"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            fill="currentColor"
                            class="bi bi-chevron-compact-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
                            />
                          </svg>
                        </div>
                        <span class="d-none d-sm-block">More Details</span>
                      </button>
                    </div>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// receive searched result from searchtest page
import MOCK_DATA from "../../places.json";
export default {
  // props: ["search"]
  data() {
    return {
      csps: MOCK_DATA,
      gridLayout: true,
      search: "",
      checked: false,
      autocompleteaddress: "",
      showMap: false,
      breakCol: "col-6",
      dontBreak: "col-12",
      arrangeCards:
        "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3",
      dontArrange: "row row-cols-1 row-cols-sm-1 row-cols-lg-2 g-3",
      hideImage: "d-none",
      showImage: "w-25 p-0 img-fluid",
    };
  },
  methods: {
    shortenAddress(address) {
      return address.substring(0, 30) + "...";
    },
    toggleMap() {
      if (this.checked) {
        return (this.showMap = true);
      } else {
        return (this.showMap = false);
      }
    },
  },
  computed: {
    filteredList() {
      return this.csps.filter((csp) => {
        return csp.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    const autocomplete = new window.google.maps.places.Autocomplete(
      this.$refs["autocomplete"],
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(1.29027, 103.851959)
        ),
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      this.address = place.formatted_address;
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      this.showLocationOnTheMap(this.lat, this.lng);
    });
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.img_align {
  position: relative;
}

.text_align {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 0.7rem;
  padding-bottom: 0.4rem;
  color: white;
}

.zoom {
  transition: transform 0.5s;
  margin: 0 auto;
}

.zoom:hover {
  -ms-transform: scale(1.05);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}

.parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.child {
  margin: 0 0.5rem 0.5rem 0;
}

.card,
.list-group-item {
  background-color: #f8f9fa;
}

.card:hover,
.list-group-item:hover {
  background-color: #ffe48c;
}

.form-check {
  position: relative;
}

.form-check-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.form-check-input {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translate(50%, 0);
}
</style>
