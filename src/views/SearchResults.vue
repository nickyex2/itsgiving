<template>
  <div class="container search-container">
    <div class="row overall" data-aos="fade-in" data-aos-duration="1500">
      <div
        :class="
          showMap
            ? 'container-fluid col-md-5 filter-nav py-2'
            : 'container-fluid col-md-3 filter-nav py-2'
        "
      >
        <div class="row" data-aos="fade-in" data-aos-duration="1500">
          <div
            class="col-12 searchbar d-flex justify-content-left"
            :style="showMap ? 'width: 50%' : ''"
          >
            <input
              class="form-control h-100"
              type="text"
              v-model="search"
              placeholder="Enter A Project Title"
              ref=""
              @keyup="showPlacesOnMap"
              style="font-size: 13px"
            />
          </div>
          <div
            class="col-12 searchbar d-flex justify-content-left"
            :style="showMap ? 'width: 50%' : ''"
          >
            <input
              class="form-control h-100"
              type="text"
              v-model="cat"
              placeholder="Enter A Category"
              ref=""
              @keyup="showPlacesOnMap"
              style="font-size: 13px"
            />
          </div>
        </div>

        <div :class="showMap ? mapDisplay : test" class="row row-col-2 pb-3">
          <div
            class="rcol d-flex justify-content-left"
            :style="showMap ? 'width: 70%' : ''"
          >
            <input
              class="form-control"
              v-model="autocompleteaddress"
              placeholder="Enter A Location"
              ref="autocompleteaddress"
              style="width: 85%; font-size: 13px"
            />
            <button
              type="button"
              class="btn btn-danger py-0"
              @click="locatorButtonPressed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-cursor py-1"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"
                />
              </svg>
              <!-- <p style="font-size: 0.6rem; margin: 0" class="pb-2">Locate Me</p> -->
            </button>
          </div>
          <div class="col" :style="showMap ? 'width: 30%' : ''">
            <!-- <p style="font-size: 12px">Range</p> -->
            <select
              class="form-select"
              v-model="selectedRadius"
              @change="replotRadius"
              style="height: 41px; color: grey; font-size: 13px"
            >
              <option value="0" selected disabled hidden>Plot Radius</option>
              <option value="1000">1km</option>
              <option value="2000">2km</option>
              <option value="3000">3km</option>
            </select>
          </div>
        </div>

        <div class="col form-check form-switch py-1">
          <span @change="showPlacesOnMap">
            <label class="switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                v-model="checked"
                @change="toggleMap"
                @click="gridLayout = !gridLayout"
              />
              <span class="slider round"></span>
            </label>
          </span>
          <span style="position: absolute; font-size: 13px; margin-top: 0.2%"
            >Show Map</span
          >
        </div>

        <div class="album">
          <!--div class="album py-5 bg-light"-->
          <div
            :class="showMap ? mapDisplay : test"
            :style="[showMap ? { height: '700px' } : '']"
          >
            <!-- change here -->
            <div>
              <!--div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"-->
              <span class="list-group">
                <div
                  :class="{ active: activeIndex === index }"
                  v-for="(csp, index) in filteredList"
                  :key="csp.id"
                  style="border-radius: 12px"
                >
                  <a
                    href="#"
                    class="list-group-item list-group-item-action flex-column align-items-start mb-2 card zoom p-2 overflow-wrap"
                    style="height: 200%; width: 100%"
                    @click="handleClickDetails(csp.id)"
                  >
                    <span
                      class="d-flex flex-column align-left h-100 position-relative img_align list-item"
                    >
                      <div
                        class="d-block ps-3 py-3"
                        style="
                          margin-top: auto;
                          margin-bottom: auto;
                          width: 80%;
                          height: 100%;
                        "
                      >
                        <h3 style="text-align: left">{{ csp.name }}</h3>
                        <div
                          v-if="autocompleteaddress != ''"
                          style="text-align: left"
                        >
                          {{ getDistance(csp.location.lat, csp.location.lng) }}
                          away from you
                        </div>
                        <div class="parent">
                          <span
                            class="child"
                            v-for="(tag, count) in csp.interest"
                            :key="tag"
                          >
                            <span
                              class="badge rounded-pill mb-2 cspbadge"
                              style="font-size: 10px"
                              v-if="count < 5"
                              >{{ tag }}</span
                            >
                          </span>
                        </div>
                        <br />
                        <p style="text-align: left" class="mt-2 csp-deets">
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
                          >&nbsp;&nbsp;Estimated: {{ csp.csp_hours }} Hours
                        </p>
                        <p
                          style="text-align: left"
                          class="text-truncate d-none d-sm-block csp-deets"
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
                          >&nbsp; {{ csp.location.address }}
                        </p>
                        <p
                          style="text-align: left"
                          class="card-text d-none d-lg-block text-truncate csp-deets"
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
                        <button
                          class="w-100 showonmap"
                          @click.stop="showInfoWindow(index)"
                        >
                          Show On Map
                        </button>
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
                          class="btn btn-sm my-5"
                          style="border-radius: 12px"
                          @click="handleClickDetails(csp.id)"
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
                        </button>
                      </div>
                    </span>
                  </a>
                </div>
              </span>
            </div>
          </div>
        </div>

        <!-- <div class="col-1" v-if="gridLayout">
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
          </div> -->
      </div>

      <div
        :class="
          showMap
            ? 'row py-2 col-md-7 cards-all mapres order-first order-md-last'
            : 'row py-2 col cards-all'
        "
      >
        <div :class="showMap ? gone : dontBreak">
          <div class="album">
            <!--div class="album py-5 bg-light"-->
            <div
              :class="showMap ? mapDisplay : normalDisplay"
              :style="[showMap ? { height: '700px' } : '']"
            >
              <!-- change here -->
              <div
                :class="showMap ? dontArrange : arrangeCards"
                v-if="gridLayout"
              >
                <!--div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"-->
                <div
                  v-for="(csp, index) in filteredList"
                  :class="{ active: activeIndex === index }"
                  :key="csp.id"
                  data-aos="fade-in"
                  data-aos-duration="1500"
                >
                  <div class="col" style="height: 100%">
                    <div
                      class="card-csp"
                      style="
                        border-radius: 12px;
                        height: 100%;
                        background-color: white;
                      "
                      @click="handleClickDetails(csp.id)"
                    >
                      <div class="img_align">
                        <img
                          class="w-100 ps-2 pe-2 pt-2"
                          height="225"
                          :src="csp.cover_image"
                          style="
                            border-top-left-radius: 12px;
                            border-top-right-radius: 12px;
                            object-fit: cover;
                          "
                        />
                        <div class="text_align d-flex ps-1">
                          <span class="badge text-dark"
                            >Posted {{ monthsDiff(csp.date_created) }} Months
                            Ago</span
                          >
                        </div>
                      </div>
                      <div class="card-body px-3 py-2">
                        <h3 style="text-align: left">{{ csp.name }}</h3>
                        <div
                          v-if="autocompleteaddress != ''"
                          style="text-align: left"
                        >
                          {{ getDistance(csp.location.lat, csp.location.lng) }}
                          away from you
                        </div>
                        <div class="parent">
                          <span
                            clas="child"
                            v-for="(tag, count) in csp.interest"
                            :key="tag"
                          >
                            <span
                              class="badge rounded-pill cspbadge"
                              style="font-size: 0.7rem"
                              v-if="count < 5"
                              >{{ tag }}</span
                            >
                          </span>
                        </div>
                        <br />
                        <div style="text-align: left" class="mt-2 row">
                          <div class="col-1">
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
                              />
                            </svg>
                          </div>
                          <div class="col-10">
                            <p>Estimated: {{ csp.csp_hours }} Hours</p>
                          </div>
                        </div>
                        <div style="text-align: left" class="mt-2 row">
                          <div class="col-1">
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
                              />
                            </svg>
                          </div>
                          <div class="col-10">
                            <p>{{ shortenAddress(csp.location.address) }}</p>
                          </div>
                        </div>
                        <div style="text-align: left" class="mt-2 row">
                          <div class="col-1">
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
                          </div>
                          <div class="col-10">
                            <p>{{ shortenAddress(csp.description) }}</p>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="d-flex justify-content-center">
                          <div class="btn-group">
                            <button
                              type="button"
                              class="btn btn-sm btn-outline-secondary"
                              @click="handleClickDetails(csp.id)"
                            >
                              More Details
                            </button>
                          </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-12 test"
          ref="map"
          :class="showMap ? mapDisplay2 : test"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
// receive searched result from searchtest page
import axios from "axios";
import { useRoute } from "vue-router";
import { getDatabase, ref as dbRefe, get } from "firebase/database";
export default {
  // props: ["search"]
  data() {
    return {
      csps: [],
      gridLayout: true,
      search: "",
      checked: false,
      autocompleteaddress: "",
      showMap: false,
      breakCol: "col-6",
      dontBreak: "col-12",
      arrangeCards:
        "row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3",
      dontArrange: "row row-cols-1 row-cols-sm-1 row-cols-lg-2 g-3",
      hideImage: "d-none",
      showImage: "w-25 p-0 img-fluid",
      lat: 1.296568,
      lng: 103.852119,
      apiKey: "AIzaSyBuOFt-d_m9wfX3sjpebEx3IEhuLbSTmfE",
      displayMap: "col-6 py-2",
      places: [],
      markers: [],
      activeIndex: -1,
      normalDisplay: "container px-0",

      test: "container px-0 d-none",
      gone: "d-none",

      mapDisplay: "container px-0 overflow-auto",
      mapDisplay2: "container px-0",
      selectedRadius: 0,
      circle: null,
      cat: "",
      googlemap: null,
    };
  },
  methods: {
    shortenAddress(address) {
      if (address.length > 200) {
        return address.substring(0, 200) + "...";
      } else {
        return address;
      }
    },
    toggleMap() {
      if (this.checked) {
        return (this.showMap = true);
      } else {
        return (this.showMap = false);
      }
    },
    toggleBounce() {
      if (window.marker.getAnimation() !== null) {
        window.marker.setAnimation(null);
      } else {
        window.marker.setAnimation(window.google.maps.Animation.BOUNCE);
      }
    },
    locatorButtonPressed() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );
          this.showPlacesOnMap();
        });
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
            this.autocompleteaddress =
              response.data.results[0].formatted_address;
            // console.log(this.autocompleteaddress);
          }
        })
        .catch((error) => {
          this.err = error.message;
          console.log(error.message);
        });
    },
    replotRadius() {
      this.showPlacesOnMap();
    },
    showPlacesOnMap() {
      this.places = [];
      this.markers = [];
      this.places = this.filteredList;
      var map = new window.google.maps.Map(this.$refs["map"], {
        zoom: 15,
        center: new window.google.maps.LatLng(this.lat, this.lng),
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });
      this.googlemap = map;
      this.circle = new window.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: this.lat, lng: this.lng },
        radius: parseInt(this.selectedRadius),
      });
      var boxicon =
        "https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|You|FF0000|000000";
      new window.google.maps.Marker({
        position: new window.google.maps.LatLng(this.lat, this.lng),
        map: map,
        animation: window.google.maps.Animation.DROP,
        icon: boxicon,
      });
      const infoWindow = new window.google.maps.InfoWindow({
        maxWidth: 350,
      });
      // console.log(this.places);
      for (let i = 0; i < this.places.length; i++) {
        const lat = this.places[i].location.lat;
        const lng = this.places[i].location.lng;
        let pinIcon = {
          url:
            "https://chart.googleapis.com/chart?chst=d_bubble_texts_big&chld=bb|ffe48c|000000|" +
            `${this.places[i].name}` +
            "|" +
            `${this.places[i].csp_hours} Hours` +
            "|***Click+For+More+Details***",
          scaledSize: new window.google.maps.Size(100, 60),
          origin: new window.google.maps.Point(0, 0), // origin
          anchor: new window.google.maps.Point(0, 0), // anchor
        };
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(lat, lng),
          map: map,
          animation: window.google.maps.Animation.DROP,
          icon: pinIcon,
        });
        this.markers.push(marker);
        window.google.maps.event.addListener(marker, "click", () => {
          const place = this.places[i];
          let int = this.processInterest(place.interest);
          infoWindow.setContent(
            `<div>
              <img src="${place.cover_image}" class="w-100">
              <div class="h3">${place.name}</div>
                      ${int}
                      <br>
                      <div class="d-flex text-left"><span class="fw-bold">Estimated Hours: </span> ${
                        place.csp_hours
                      } Hours</div>
                      <br>
                      <div class="d-flex text-left"><span class="fw-bold">Location: </span> ${this.shortenAddress(
                        place.location.address
                      )}</div>
                      <br>
                      <button id="viewdeetsinfowindow">More Details</button>
                    </div>`
          );
          window.google.maps.event.addListener(infoWindow, "domready", () => {
            document
              .getElementById("viewdeetsinfowindow")
              .addEventListener("click", () => {
                console.log(this.handleClickDetails(place.id));
              });
          });
          infoWindow.open(map, marker);
        });
      }
    },
    showInfoWindow(index) {
      this.activeIndex = index;
      new window.google.maps.event.trigger(this.markers[index], "click");
      this.googlemap.setCenter({
        lat: this.places[index].location.lat,
        lng: this.places[index].location.lng,
      });
    },
    monthsDiff(date1) {
      var d1 = new Date(date1);
      var d2 = new Date();
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth() + 1;
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    },
    toRad(Value) {
      return (Value * Math.PI) / 180;
    },
    calcCrow(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = this.toRad(lat2 - lat1);
      var dLon = this.toRad(lon2 - lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d.toFixed(2);
    },

    // Converts numeric degrees to radians
    getDistance(lat, lng) {
      if (this.autocompleteaddress != "") {
        return this.calcCrow(lat, lng, this.lat, this.lng) + " km";
      }
    },
    async getCsps() {
      const db = getDatabase();
      const cspRef = dbRefe(db, "/csp");
      await get(cspRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (const key in snapshot.val()) {
              var csp = snapshot.val()[key];
              csp.id = key;
              csp.location.lat = parseFloat(csp.location.lat);
              csp.location.lng = parseFloat(csp.location.lng);
              if (new Date(csp.date_end).getTime() > new Date().getTime()) {
                this.csps.push(csp);
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleClickDetails(id) {
      this.$router.push(`/csp/${id}`);
    },
    processInterest(interest) {
      var result = `<div class="d-flex justify-content-center" style="height:25px;">`;
      for (let key in interest) {
        if (key <= 4) {
          result += `
        <span
                              class="badge rounded-pill cspbadge mb-2"
                              style="font-size: 10px"
                              >${interest[key]}</span
                            >   
        `;
        }
      }
      result += `</div>`;
      return result;
    },
  },
  computed: {
    filteredList() {
      return this.csps.filter((csp) => {
        return (
          csp.name.toLowerCase().includes(this.search.toLowerCase()) &&
          csp.interest.join().toLowerCase().includes(this.cat.toLowerCase())
        );
      });
    },
  },
  created() {
    const route = useRoute();
    if (route.query.cat) {
      this.cat = route.query.cat;
    }
    this.getCsps();
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
      this.autocompleteaddress = place.formatted_address;
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      this.showPlacesOnMap();
    });
  },
};
</script>
