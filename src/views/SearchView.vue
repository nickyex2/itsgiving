<template>
  <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
  <div class="container-fluid p-3">
    <div class="row">
      <div class="col-6 border border-3 rounded">
        <div class="row pt-3" v-if="err != ''">
          <div
            class="col mx-2 text-center border border-3 rounded border-danger"
          >
            {{ err }}
          </div>
        </div>
        <div class="row form-floating pt-3">
          <div class="col-3 pe-0">
            <button
              type="button"
              class="w-100 btn btn-danger"
              @click="locatorButtonPressed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
                ></path>
                <path
                  d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                ></path>
              </svg>
              <span style="font-size: 0.75em">Locate Me</span>
            </button>
          </div>
          <div class="col-9 ps-0">
            <input
              class="form-control h-100"
              v-model="address"
              placeholder="Alternatively Enter Your Address"
              ref="autocomplete"
              required
            />
          </div>
        </div>
        <div class="row form-floating pt-3">
          <div class="col-md-6">
            <select v-model="type" class="form-select" required>
              <option value="" disabled selected hidden>
                -----Select a Category-----
              </option>
              <option value="All">All</option>
              <option value="Children">Children</option>
              <option value="Elderly">Elderly</option>
              <option value="Pets">Pets</option>
            </select>
          </div>
          <div class="col-md-6">
            <select class="form-select" style="width: 100%" v-model="radius">
              <option value="1">(NOT IMPLEMENTED YET)</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col pt-3">
            <p>Number Of Hours Selected: {{ hoursselected }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-1 pt-1">0</div>
          <div class="col-10 pt-1">
            <input
              type="range"
              style="width: 100%"
              v-model="hoursselected"
              min="0"
              max="80"
            />
          </div>
          <div class="col-1 pt-1">80</div>
        </div>
        <div class="row">
          <div class="col py-3" v-if="this.lat == 0 || this.type == ''">
            <button type="button" class="btn btn-danger w-100" disabled>
              Find CSP Near Me
            </button>
          </div>
          <div class="col py-3" v-else>
            <span @click="showresults = true"
              ><button
                type="button"
                @click="findCloseBuyButtonPressed"
                class="btn btn-danger w-100"
              >
                Find CSP Near Me
              </button></span
            >
          </div>
        </div>
        <div
          style="max-height: 500px; overflow: auto"
          v-show="showresults"
          ref="cspresults"
        >
          <div class="h4 p-2 sticky-top bg-white">
            Displaying {{ totalResults }} Results
          </div>
          <div
            class="item"
            v-for="(place, index) in places"
            :key="place.id"
            @click="showInfoWindow(index)"
            :class="{ active: activeIndex === index }"
            style="padding-top: 10px; padding-bottom: 10px"
          >
            <div class="container">
              <div class="row">
                <div class="col-3">
                  <img :src="place.image" class="w-100 h-100" />
                </div>
                <div class="col-9">
                  <div class="fw-bold">CSP Title: {{ place.name }}</div>
                  <div class="">Category: {{ place.cat }}</div>
                  <div class="">Hours: {{ place.hours }} Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6" ref="map"></div>
    </div>
    <!-- row -->
  </div>
  <!-- container -->
</template>
<script>
import axios from "axios";
import csp from "../../places.json";
export default {
  data() {
    return {
      hoursselected: 40,
      address: "",
      err: "",
      apiKey: "AIzaSyBuOFt-d_m9wfX3sjpebEx3IEhuLbSTmfE",
      lat: 0,
      lng: 0,
      type: "",
      radius: "",
      places: [],
      markers: [],
      activeIndex: -1,
      showresults: false,
      totalResults: 0,
    };
  },

  mounted() {
    let test = document.createElement("script");
    test.setAttribute(
      "src",
      "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBuOFt-d_m9wfX3sjpebEx3IEhuLbSTmfE"
    );
    document.head.appendChild(test);
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

  methods: {
    toggleBounce() {
      if (window.marker.getAnimation() !== null) {
        window.marker.setAnimation(null);
      } else {
        window.marker.setAnimation(window.google.maps.Animation.BOUNCE);
      }
    },
    locatorButtonPressed() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
            this.showLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            );
          }
          // (err) => {
          //   this.err =
          //     "Locator is unable to find your address. Please type your address manually.";
          //   this.spinner = false;
          // }
        );
      } else {
        this.err = "Your browser does not support geolocation API ";
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=" +
            this.apiKey
        )
        .then((response) => {
          if (response.data.error_message) {
            this.err = response.data.error_message;
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
            console.log(response.data.results[0].formatted_address);
          }
        })
        .catch((error) => {
          this.err = error.message;
          console.log(error.message);
        });
    },
    findCloseBuyButtonPressed() {
      this.places = [];
      if (this.type != "All") {
        for (let x = 0; x < csp.length; x++) {
          if (csp[x].cat == this.type) {
            if (csp[x].hours > this.hoursselected) {
              this.places.push(csp[x]);
            }
          }
        }
      } else {
        for (let x = 0; x < csp.length; x++) {
          if (csp[x].hours > this.hoursselected) {
            this.places.push(csp[x]);
          }
        }
      }
      this.totalResults = this.places.length;
      this.showPlacesOnMap();
    },
    showLocationOnTheMap(latitude, longitude) {
      // Show & center the Map based oon
      var map = new window.google.maps.Map(this.$refs["map"], {
        zoom: 15,
        center: new window.google.maps.LatLng(latitude, longitude),
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });

      new window.google.maps.Marker({
        position: new window.google.maps.LatLng(latitude, longitude),
        map: map,
        animation: window.google.maps.Animation.DROP,
        label: "You",
      });
    },
    showPlacesOnMap() {
      var map = new window.google.maps.Map(this.$refs["map"], {
        zoom: 15,
        center: new window.google.maps.LatLng(this.lat, this.lng),
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });
      new window.google.maps.Marker({
        position: new window.google.maps.LatLng(this.lat, this.lng),
        map: map,
        animation: window.google.maps.Animation.DROP,
        label: "You",
      });
      const infoWindow = new window.google.maps.InfoWindow();
      console.log(this.places);
      for (let i = 0; i < this.places.length; i++) {
        const lat = this.places[i].lat;
        const lng = this.places[i].lng;
        // const placeID = this.places[i].id;

        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(lat, lng),
          map: map,
          animation: window.google.maps.Animation.DROP,
          label: `${this.places[i].hours} Hours`,
        });
        // console.log(marker)
        this.markers.push(marker);
        new window.markerClusterer.MarkerClusterer({
          map,
          markers: this.markers,
        });
        window.google.maps.event.addListener(marker, "click", () => {
          const place = this.places[i];
          infoWindow.setContent(
            `<img src="${place.image}"><div class="ui header">${place.name}</div>
                    ${place.cat} <br>
                    ${place.hours} Hours</a>
                    
                    
                    `
          );
          infoWindow.open(map, marker);
        });
      }
    },

    showInfoWindow(index) {
      this.activeIndex = index;
      new window.google.maps.event.trigger(this.markers[index], "click");
    },
  },
};
</script>
<style scoped>
.active {
  background: lightgrey !important;
}
</style>
