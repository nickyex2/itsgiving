<template>
  <div class="carousel-item active" v-if="id == 0">
    <div class="col-md-3">
      <div class="card">
        <img :src="csp.cover_image" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ csp.name }}</h5>
          <p class="card-text">
            {{ description }}
          </p>
          <router-link :to="`/csp/${cspID}`" class="btn btn-primary"
            >Go to CSP</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <div class="carousel-item" v-else>
    <div class="col-md-3">
      <div class="card">
        <img :src="csp.cover_image" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ csp.name }}</h5>
          <p class="card-text">
            {{ description }}
          </p>
          <router-link :to="`/csp/${cspID}`" class="btn btn-primary"
            >Go to CSP</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "CardCarouselItem-component",
  props: ["id", "csp"],
  setup(props) {
    const cspID = props.csp.link.slice(35);
    const description = ref(props.csp.description);
    if (props.csp.description.length > 50) {
      description.value = props.csp.description.slice(0, 50) + "...";
    }
    return { cspID, description };
  },
  mounted() {
    let items = document.querySelectorAll(".carousel-item");

    items.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  },
};
</script>

<style></style>
