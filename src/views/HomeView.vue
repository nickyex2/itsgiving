<template>
  <div class="home">
    <!-- navbar -->
    <!-- end -->

    <!-- header -->
    <header>
      <div class="vid">
        <video autoplay muted loop id="myVideo">
          <source src="../assets/vid.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="container">
        <div class="content">
          <h1
            id="title"
            class="mb-0"
            data-aos="fade-in"
            data-aos-duration="1500"
          >
            ITS GIVING
          </h1>
          <p class="mb-0" data-aos="fade-in" data-aos-duration="1500">
            POVERTY
          </p>
          <button data-aos="fade-in" data-aos-duration="1500">
            Learn More
          </button>
        </div>
      </div>
    </header>
    <!-- end -->

    <!-- 2 action tabs -->
    <div class="action container" data-aos="fade-in" data-aos-duration="1500">
      <div class="row">
        <div class="click col-12 col-sm-6">
          <!-- binding method A -->
          <div class="box_text">
            <router-link :to="'/search'" class="home-2">
              <i><img src="../assets/discover.png" alt="#" /></i>
              <span>Search & Apply</span>
              <p>
                ipsum dolor sit amet, consectetur adipiscing elit,<br />
                sed d veniam, adipiscing elit, sed d veniam
              </p>
            </router-link>
          </div>
        </div>
        <div class="click col-12 col-sm-6">
          <!-- binding method B -->
          <div class="box_text">
            <router-link :to="'/create'" class="home-2">
              <i><img src="../assets/idea.png" alt="#" /></i>
              <span>Create CSP</span>
              <p>
                ipsum dolor sit amet, consectetur adipiscing elit, <br />
                sed d veniam, adipiscing elit, sed d veniam
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- 2 counters -->
    <div
      class="container"
      id="counters"
      data-aos="fade-in"
      data-aos-duration="1500"
    >
      <div class="row">
        <div class="counter col-12 col-sm-6" id="csp">
          <img src="../assets/help.png" alt="csp" />
          <div class="counter-container">
            <div class="counter-ani" data-target="10"></div>
          </div>
          <p>Community Service Projects</p>
        </div>

        <div class="counter col-12 col-sm-6" id="vol">
          <img src="../assets/clock.png" alt="vol" />
          <div class="counter-container">
            <div class="counter-ani" data-target="80"></div>
          </div>
          <p>Hours</p>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- card carousel -->
    <div
      class="cc container text-center"
      data-aos="fade-in"
      data-aos-duration="1500"
    >
      <h1 class="explore-title">Just Listed</h1>
      <div class="row mx-auto my-auto justify-content-center">
        <div id="recipeCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
              <div class="col-md-3">
                <div class="card">
                  <img
                    src="../assets/logo.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="col-md-3">
                <div class="card">
                  <img
                    src="../assets/logo.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="col-md-3">
                <div class="card">
                  <img
                    src="../assets/logo.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="col-md-3">
                <div class="card">
                  <img
                    src="../assets/logo.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="col-md-3">
                <div class="card">
                  <img
                    src="../assets/logo.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="col-md-3">
                <div class="card">
                  <img
                    src="../assets/logo.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev bg-transparent w-aut"
            href="#recipeCarousel"
            role="button"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </a>
          <a
            class="carousel-control-next bg-transparent w-aut"
            href="#recipeCarousel"
            role="button"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- explore icons -->
    <div class="explore container" data-aos="fade-in" data-aos-duration="1500">
      <h1 class="explore-title">Explore</h1>
      <div class="explore-row row">
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Animal Welfare' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/animal.png" alt="#" /></i>
              <p>Animal Welfare</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Arts & Heritage' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/protect.png" alt="#" /></i>
              <p>Arts & Heritage</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Children & Youth' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/children.png" alt="#" /></i>
              <p>Children & Youth</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Community' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/community.png" alt="#" /></i>
              <p>Community</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Disability' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/love.png" alt="#" /></i>
              <p>Disability</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Education' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/graduate-cap.png" alt="#" /></i>
              <p>Education</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Elderly' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/couple.png" alt="#" /></i>
              <p>Elderly</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Environment' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/save-the-planet.png" alt="#" /></i>
              <p>Environment</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Families' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/family.png" alt="#" /></i>
              <p>Families</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Health' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/healthcare.png" alt="#" /></i>
              <p>Health</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Humanitarian' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/aid.png" alt="#" /></i>
              <p>Humanitarian</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Social Services' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/public-service.png" alt="#" /></i>
              <p>Social Services</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Sports' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/sports.png" alt="#" /></i>
              <p>Sports</p>
            </div>
          </router-link>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <router-link
            :to="{ path: '/search', query: { cat: 'Women & Girls' } }"
            class="explore-link"
          >
            <div class="words">
              <i><img src="../assets/female.png" alt="#" /></i>
              <p>Women & Girls</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- footer -->
    <!-- end -->
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {},
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
