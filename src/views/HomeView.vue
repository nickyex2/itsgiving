<template>
  <div class="home">
    
    <!-- header -->
    <header>
      <div class="vid">
        <video autoplay muted loop id="myVideo">
          <source src="../assets/vid.mp4" type="video/mp4">
        </video>
      </div>

      <div class="content">
        <h1 id="title" class="mb-0">ITS GIVING</h1>
        <p class="mb-0">POVERTY</p>
        <button>Learn More</button>
      </div>
    </header>
    <!-- end -->

    <!-- 2 action tabs -->
    <div class="three_box">
         <div class="container">
            <div class="row">
               <div class="click col-6">
                  <div class="box_text">
                     <h3>Search & Apply</h3>
                     <p>ipsum dolor sit amet, consectetur adipiscing elit,<br> sed d veniam, adipiscing elit, sed d veniam</p>
                  </div>
               </div>
               <div class="click col-6">
                  <div class="box_text">
                     <h3>Create CSP</h3>
                     <p>ipsum dolor sit amet, consectetur adipiscing elit, <br> sed d veniam, adipiscing elit, sed d veniam</p>
                  </div>
               </div>
            </div>
         </div>
    </div>
    <!-- end -->

    <!-- 2 counters -->
    <div class="float-container" id="counters">
      <div class="row">
        <div class="counter col-6" id="csp">
          <img src="../assets/teamwork.png" alt="csp">
          <h1>10</h1>
          <p>Community Service Projects</p>
        </div>

        <div class="counter col-6" id="vol">
          <img src="../assets/clock.png" alt="vol">
          <h1>80</h1>
          <p>Volunteers</p>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- card carousel -->
    <!-- end -->
    <div class="container-fluid">
    </div>

    <!-- explore icons -->
    <div class="six_box">
      <h1>Explore</h1>
         <div class="container-fluid">
            <div class="row justify-content-center">
               <div class="col-2 pa_left">
                  <div class="six_probpx yellow_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>Shoes</span>
                  </div>
               </div>
               <div class="col-2 pa_left">
                  <div class="six_probpx bluedark_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>underwear</span>
                  </div>
               </div>
               <div class="col-2 pa_left">
                  <div class="six_probpx yellow_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>Pante & socks</span>
                  </div>
               </div>
               <div class="col-2 pa_left">
                  <div class="six_probpx bluedark_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>T-shirt & tankstop</span>
                  </div>
               </div>
               <div class="col-2 pa_left">
                  <div class="six_probpx yellow_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>cardigans & jumpers</span>
                  </div>
               </div>

            </div>

            <div class="row justify-content-center" id="secondrow">
               <div class="col-2 pa_left">
                  <div class="six_probpx yellow_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>Shoes</span>
                  </div>
               </div>
               <div class="col-2 pa_left">
                  <div class="six_probpx bluedark_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>underwear</span>
                  </div>
               </div>
               <div class="col-2 pa_left">
                  <div class="six_probpx yellow_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>Pante & socks</span>
                  </div>
               </div>
               <div class="col-2 pa_left">
                  <div class="six_probpx bluedark_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>T-shirt & tankstop</span>
                  </div>
               </div>
               <div class="col-2 pa_left">
                  <div class="six_probpx yellow_bg">
                     <i><img src="../assets/paw.png" alt="#"/></i>
                     <span>cardigans & jumpers</span>
                  </div>
               </div>

            </div>
         </div>
      </div>
    <!-- end -->

    <!-- footer -->
    <footer>
    </footer>
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
