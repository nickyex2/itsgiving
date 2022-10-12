<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <!-- can edit this is just the base line -->
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="'/'">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="'/'" class="nav-link"> Home </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/about'" class="nav-link"> About </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/login'">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/signup'">Signup</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav-bar",
};
</script>

<style></style>
