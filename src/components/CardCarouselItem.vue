<template>
  <div class="carousel-item active" v-if="id == 0">
    <div class="col-md-3">
      <div class="card">
        <img :src="csp.cover_image" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ csp.name }}</h5>
          <p class="card-text">
            {{ csp.description }}
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
            {{ csp.description }}
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
export default {
  name: "CardCarouselItem-component",
  props: ["id", "csp"],
  setup(props) {
    const cspID = props.csp.link.slice(35);
    return { cspID };
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

    const counters = document.querySelectorAll(".counter-ani");
    counters.forEach((counter) => {
      counter.innerText = "0";
      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 200;
        if (count < target) {
          counter.innerText = `${Math.ceil(count + increment)}`;
          setTimeout(updateCounter, 50);
        } else counter.innerText = target;
      };
      updateCounter();
    });
  },
};
</script>

<style></style>
