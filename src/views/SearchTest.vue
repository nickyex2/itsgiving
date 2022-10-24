<!-- <template>
  <header>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="vid">
      <h1>testing converting address to LONG AND LAT</h1>
      <br />
      <br />
      <h1>
        {{ long }}
        {{ lat }}
      </h1>
      <br />
      <br />
      <br />
      <br />
      <form action="">
        <input
          v-model="search"
          placeholder="Enter An Address"
          required
          ref="autocomplete"
        />
        <svg
          @click="getLongLat"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-search fa"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
        <a id="clear-btn" @click="deleteData">Clear</a>
      </form>
    </div>
  </header>
</template>
<script>
import axios from "axios";

export default {
  name: "SearchTest",
  data() {
    return {
      search: "",
      long: "",
      lat: "",
      apiKey: "AIzaSyBuOFt-d_m9wfX3sjpebEx3IEhuLbSTmfE",
    };
  },
  methods: {
    deleteData() {
      this.search = "";
    },
    performSearch() {
      // once the user clicks the search button, redirect to searchview.vue
      if (this.search != "") {
        this.$router.push({
          name: "searchresults",
          params: { search: this.search },
        });
        this.$router.path = "/searchresults";
      }
    },
    getLongLat() {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            encodeURIComponent(this.search) +
            "&key=" +
            this.apiKey
        )
        .then((response) => {
          console.log(response.data.results);
          this.long = response.data.results[0].geometry.location.lng;
          this.lat = response.data.results[0].geometry.location.lat;
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
  },
};
</script>
<style scoped>
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
  background: #07051a;
}

form {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 1s;
  width: 100px;
  height: 100px;
  background: white;
  box-sizing: border-box;
  border-radius: 50px;
  border: 4px solid white;
}

input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  line-height: 30px;
  outline: 0;
  border: 0;
  display: none;
  font-size: 2em;
  border-radius: 40px;
  padding: 0 20px;
}

.fa {
  box-sizing: border-box;
  padding: 20px;
  width: 85px;
  height: 85px;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  color: #07051a;
  text-align: center;
  font-size: 2em;
  transition: all 1s;
}

form:hover,
form:valid {
  width: 75vw;
  cursor: pointer;
}

form:hover input,
form:valid input {
  display: block;
}

form:hover .fa,
form:valid .fa {
  background: #07051a;
  color: white;
}

a {
  display: none;
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 1.5em;
  color: white;
  text-align: center;
  width: 100%;
}

form:valid a {
  display: block;
}
</style> -->
