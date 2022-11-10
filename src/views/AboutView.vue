<template>
  <div class="about">
    <!-- navbar -->
    <!-- end -->

    <!-- about us header -->
    <div class="section">
      <div class="container">
        <div class="abouttop row" data-aos="fade-in" data-aos-duration="1500">
          <div class="col-md-6">
            <img src="../assets/image.jpeg" alt="#" />
          </div>
          <div class="aboutinfo col-md-6" data-aos="fade-in">
            <div class="full">
              <h4 class="about-title">Who are we?</h4>
              <p class="about-desc">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
                unde placeat impedit officia, alias commodi optio reiciendis
                eaque praesentium saepe libero nihil perferendis.
              </p>
              <div class="numbers row">
                <div class="col-6">
                  <div class="counter-container">
                    <div class="counter-ani-abt" :data-target="totalCsps"></div>
                  </div>
                  <p>CSPs listed</p>
                </div>
                <div class="col-6">
                  <div class="counter-container">
                    <div
                      class="counter-ani-abt"
                      :data-target="totalApplicants"
                    ></div>
                  </div>
                  <p>Sign Ups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- what we do/how it works -->
    <div class="hiw container" data-aos="fade-in" data-aos-duration="1500">
      <h1>How it works</h1>
      <div class="how-it-works row">
        <div class="col-sm-6">
          <img src="../assets/hand-up.png" alt="search" />
          <h4>Volunteer</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque omnis
            quasi saepe repudiandae ad, deserunt ipsum ipsa totam esse nihil
            explicabo est quia labore accusantium amet ducimus quidem laborum
            laudantium!
          </p>
        </div>
        <div class="col-sm-6">
          <img src="../assets/home.png" alt="search" />
          <h4>Beneficiaries</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque omnis
            quasi saepe repudiandae ad, deserunt ipsum ipsa totam esse nihil
            explicabo est quia labore accusantium amet ducimus quidem laborum
            laudantium!
          </p>
        </div>
        <!-- <div class="col">
            <img src="../assets/paw.png" alt="search">
            <h4>Volunteer</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque omnis quasi saepe repudiandae ad, 
              deserunt ipsum ipsa totam esse nihil explicabo est quia labore accusantium amet ducimus quidem laborum laudantium!</p>
          </div> -->
      </div>
    </div>
    <!-- end -->

    <!-- sign up now -->
    <div
      class="signupbanner container"
      data-aos="fade-in"
      data-aos-duration="1500"
    >
      <div class="aboutvid vid">
        <video autoplay muted loop id="myVideo">
          <source src="../assets/vid2.mp4" type="video/mp4" />
        </video>
        <p>
          Remember you choose <br />who to support, <br />how to support them,
          <br />and when inspiration strikes, <br />we’re the platform to kick
          off your giving dreams and projects!
        </p>
        <button @click="handleSignUpNow">Sign Up Now</button>
      </div>
    </div>

    <!-- meet our team -->
    <div class="container" data-aos="fade-in" data-aos-duration="1500">
      <h1 class="mtthead">Meet The Team</h1>
      <div class="mtt row row-cols-lg-4 row-cols-2 g-4">
        <div class="col">
          <div class="card h-100">
            <img src="../assets/mok.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Colin Mok</h5>
              <p class="card-text">Web Developer</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="../assets/yoon.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Daryl Yoon</h5>
              <p class="card-text">Web Developer</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="../assets/lai.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Daniel Lai</h5>
              <p class="card-text">Web Developer</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="../assets/nicky.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Nicholas Goh</h5>
              <p class="card-text">Web Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- footer -->
    <!-- end -->
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { getDatabase, get, ref as dbRefe } from "firebase/database";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "AboutView",
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters.user);
    const totalCsps = ref(0);
    const totalApplicants = ref(0);
    const db = getDatabase();
    const handleSignUpNow = () => {
      if (user.value) {
        router.push("/search");
      } else {
        router.push("/signup");
      }
    };
    onMounted(async () => {
      const cspRef = dbRefe(db, "/csp");
      await get(cspRef).then((snapshot) => {
        if (snapshot.exists()) {
          // for loop for object length
          totalCsps.value = Object.keys(snapshot.val()).length;
        }
      });
      const applyRef = dbRefe(db, "/availability");
      await get(applyRef).then((snapshot) => {
        if (snapshot.exists()) {
          // for loop for object length
          for (let csp in snapshot.val()) {
            if (snapshot.val()[csp]["applicants"] !== undefined) {
              for (let date in snapshot.val()[csp]["applicants"]) {
                for (let time in snapshot.val()[csp]["applicants"][date]) {
                  totalApplicants.value += Object.keys(
                    snapshot.val()[csp]["applicants"][date][time]
                  ).length;
                }
              }
            }
          }
        }
      });
      const counters = document.querySelectorAll(".counter-ani-abt");
      counters.forEach((counter) => {
        counter.innerText = "0";
        const updateCounter = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const increment = target / 200;
          if (count < target) {
            counter.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(updateCounter, 10);
          } else counter.innerText = target;
        };
        updateCounter();
      });
    });
    return {
      totalCsps,
      totalApplicants,
      handleSignUpNow,
    };
  },
};
</script>
