<template>
  <br />
  <br />
  <br />
  <br />
  <br />
  <div class="album py-5">
    <!--div class="album py-5 bg-light"-->
    <div class="container">
      <!-- change here -->
      <div class="row" v-if="gridLayout">
        <div class="col-11"></div>
        <div class="col-1">
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
      </div>
      <div class="row" v-else>
        <div class="col-11"></div>
        <div class="col-1">
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
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3"
        v-if="gridLayout"
      >
        <!--div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"-->
        <div v-for="csp in csps" :key="csp.id">
          <div class="col">
            <div class="card shadow-sm">
              <div class="img_align">
                <img class="w-100 p-0" height="225" :src="csp.image" alt="" />
                <div class="text_align">
                  <small>{{ csp.openings }} Openings</small>
                </div>
              </div>

              <div class="card-body px-3">
                <h3 style="text-align: left">{{ csp.name }}</h3>
                <span class="d-flex justify-content-left pb-3"
                  ><span class="badge text-uppercase">{{ csp.cat }}</span></span
                >
                <p style="text-align: left">
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
                  >&nbsp; {{ csp.address }}
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
        <p>this is a list layout</p>
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
    };
  },
  methods: {
    // if addresss is too long, then truncate it
    shortenAddress() {
      for (let i = 0; i < this.csps.length; i++) {
        if (this.csps[i].address.length > 20) {
          this.csps[i].address = this.csps[i].address.substring(0, 20) + "...";
        }
      }
    },
  },
  beforeMount() {
    this.shortenAddress();
  },
};
</script>
<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 0.8rem;
}
.img_align {
  position: relative;
}
.text_align {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 1rem;
  padding-bottom: 1rem;
  color: white;
}
</style>
