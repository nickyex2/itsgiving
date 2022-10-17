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
          <h1 id="title" class="mb-0">ITS GIVING</h1>
          <p class="mb-0">POVERTY</p>
          <button>Learn More</button>
        </div>
      </div>
    </header>
    <!-- end -->

    <!-- 2 action tabs -->
    <div class="three_box container">
      <div class="row">
        <div class="click col-6">
          <div class="box_text">
            <h3>Search & Apply</h3>
            <p>
              ipsum dolor sit amet, consectetur adipiscing elit,<br />
              sed d veniam, adipiscing elit, sed d veniam
            </p>
          </div>
        </div>
        <div class="click col-6">
          <div class="box_text">
            <h3>Create CSP</h3>
            <p>
              ipsum dolor sit amet, consectetur adipiscing elit, <br />
              sed d veniam, adipiscing elit, sed d veniam
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- 2 counters -->
    <div class="container" id="counters">
      <div class="row row-col-sm-1">
        <div class="counter col-6" id="csp">
          <img src="../assets/help.png" alt="csp" />
          <h1>10</h1>
          <p>Community Service Projects</p>
        </div>

        <div class="counter col-6" id="vol">
          <img src="../assets/clock.png" alt="vol" />
          <h1>80</h1>
          <p>Hours</p>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- card carousel -->
    <!-- end -->
    <div class="container-fluid"></div>

    <!-- explore icons -->
    <div class="explore container">
      <h1 class="explore-title">Explore</h1>
      <div class="explore-row row">
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/animal.png" alt="#" /></i>
            <p>Animal Welfare</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/protect.png" alt="#" /></i>
            <p>Arts & Heritage</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/children.png" alt="#" /></i>
            <p>Children & Youth</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/community.png" alt="#" /></i>
            <p>Community</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/love.png" alt="#" /></i>
            <p>Disability</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/graduate-cap.png" alt="#" /></i>
            <p>Education</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/couple.png" alt="#" /></i>
            <p>Elderly</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/save-the-planet.png" alt="#" /></i>
            <p>Envrironment</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/family.png" alt="#" /></i>
            <p>Families</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/healthcare.png" alt="#" /></i>
            <p>Health</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/aid.png" alt="#" /></i>
            <p>Humanitarian</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/public-service.png" alt="#" /></i>
            <p>Social Services</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/sports.png" alt="#" /></i>
            <p>Sports</p>
          </div>
        </div>
        <div class="explore-item col-lg-2 col-md-4">
          <div class="words">
            <i><img src="../assets/female.png" alt="#" /></i>
            <p>Women & Girls</p>
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
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>
