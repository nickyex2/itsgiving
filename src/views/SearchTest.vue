<template>
  <header>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="vid">
      <h1>What CSP Are You Looking For Today?</h1>
      <br />
      <br />
      <form action="">
        <input
          type="search"
          v-model="search"
          placeholder="Enter A CSP Title Or Category..."
          required
        />
        <i class="fa fa-search" @click="performSearch"></i>
        <a id="clear-btn" @click="deleteData">Clear</a>
      </form>
    </div>
  </header>
</template>
<script>
export default {
  name: "SearchTest",
  data() {
    return {
      search: "",
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
  padding: 5px;
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
  padding: 15px;
  width: 85px;
  height: 85px;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  color: #07051a;
  text-align: center;
  font-size: 3em;
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
</style>
