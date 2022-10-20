<template>
  <div class="container-fluid py-5">
    <h1>Error 404: Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <button class="btn btn-primary" @click="handletoHome">Back to Home</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const handletoHome = () => {
      router.push("/");
    };
    return { handletoHome };
  },
};
</script>

<style></style>
