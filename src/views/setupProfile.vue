<template>
  <video autoplay muted loop id="loginvid" style="position: fixed">
    <source src="../assets/signup.mp4" type="video/mp4" />
  </video>
  <div class="container-fluid d-flex justify-content-center py-5">
    <div class="container-prof">
      <header>More about yourself...</header>
      <div class="progress-bar">
        <div class="step">
          <p>Name</p>
          <div class="bullet">
            <span>1</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Contact</p>
          <div class="bullet">
            <span>2</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Interests</p>
          <div class="bullet">
            <span>3</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Picture</p>
          <div class="bullet">
            <span>4</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
      </div>
      <div class="form-outer">
        <form action="#">
          <div class="page slide-page">
            <div class="container temp">
              <div class="title">Basic Info:</div>
              <div class="field">
                <div class="label">First Name</div>
                <input type="text" v-model="userAddInfo.firstName" />
              </div>
              <div class="field">
                <div class="label">Last Name</div>
                <input type="text" v-model="userAddInfo.lastName" />
              </div>
              <div class="field">
                <button class="firstNext next">Next</button>
              </div>
            </div>
          </div>
          <div class="page">
            <div class="title">Contact Info:</div>
            <div class="field">
              <div class="label">Telegram Handle</div>
              <input
                type="text"
                class="form-control"
                id="editTeleHandle"
                v-model="userAddInfo.telegramHandle"
              />
            </div>
            <div class="field">
              <div class="label">Phone Number</div>
              <input
                type="tel"
                class="form-control"
                id="phone"
                size="8"
                v-model="userAddInfo.phoneNo"
              />
            </div>
            <div class="field btns">
              <button class="prev-1 prev">Previous</button>
              <button class="next-1 next">Next</button>
            </div>
          </div>
          <div class="page">
            <div class="title">
              Your Interests: (please select at least 1 interest)
            </div>
            <div
              v-for="interest_tag in interest_tags"
              :key="interest_tag"
              class="field-int align-items-left form-check form-check-inline"
            >
              <input
                type="checkbox"
                :id="interest_tag"
                class="form-check-input"
                :value="interest_tag"
                v-model="userAddInfo.interest"
              />
              <label :for="interest_tag" class="form-check-label">{{
                interest_tag
              }}</label>
            </div>
            <div class="field btns">
              <button class="prev-2 prev">Previous</button>
              <button class="next-2 next" :disabled="isDisabled">Next</button>
            </div>
          </div>
          <div class="page">
            <div class="title">Profile Pic:</div>
            <div class="field">
              <input
                type="file"
                class="form-control"
                id="profilePic"
                @change="handleImg"
              />
            </div>
            <div class="field btns">
              <button class="prev-3 prev">Previous</button>
              <button class="submit" @click.prevent="handleSetup">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { getDatabase, ref as dbRefe, onValue } from "firebase/database";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "setupProfile",
  setup() {
    const user = computed(() => store.state.user);
    const store = useStore();
    const db = getDatabase();
    const router = useRouter();
    const route = useRoute();
    console.log(route.query.edit);
    if (route.query.edit != "true") {
      router.push("/profile");
    }
    const interest_tags = ref([]);
    const userAddInfo = ref({
      firstName: "",
      lastName: "",
      profilePicture: "",
      phoneNo: "",
      telegramHandle: "@",
      interest: [],
      hours: 0,
      no_of_csp_done: 0,
      approved_csp: false,
      pending_csp: false,
      rejected_csp: false,
    });
    const isDisabled = computed(() => {
      if (userAddInfo.value.interest.length > 0) {
        return false;
      } else {
        return true;
      }
    });
    const handleSetup = async () => {
      // settle profile picture first and remove from userAddInfo
      // then add the rest of the info to userAddInfo
      await store.dispatch("makeUserAddInfo", userAddInfo);
      // router.push("/");
    };
    const handleImg = (event) => {
      userAddInfo.value.profilePicture = event.target.files[0];
    };
    onBeforeMount(() => {
      const dbRef = dbRefe(db, "interest-tags/");
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
          interest_tags.value.push(data[key]);
        }
      });
    });
    return {
      interest_tags,
      userAddInfo,
      user,
      handleSetup,
      handleImg,
      isDisabled,
    };
  },
  mounted() {
    const slidePage = document.querySelector(".slide-page");
    const nextBtnFirst = document.querySelector(".firstNext");
    const prevBtnSec = document.querySelector(".prev-1");
    const nextBtnSec = document.querySelector(".next-1");
    const prevBtnThird = document.querySelector(".prev-2");
    const nextBtnThird = document.querySelector(".next-2");
    const prevBtnFourth = document.querySelector(".prev-3");
    const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    const router = useRouter();
    let current = 1;
    nextBtnFirst.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-25%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    nextBtnSec.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-50%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    nextBtnThird.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-75%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    submitBtn.addEventListener("click", function () {
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
      setTimeout(function () {
        alert("Your Form Successfully Signed up");
        router.push("/");
      }, 800);
    });
    prevBtnSec.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "0%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
    prevBtnThird.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-25%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
    prevBtnFourth.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-50%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
  },
};
</script>

<style scoped>
.setup-table > tr > td {
  padding: 10px;
}
.setup-table {
  border-collapse: separate;
  border: 1px solid black;
  background-color: #f5f5f5;
  border-radius: 20px;
}
ul {
  padding-left: 0px;
}
li {
  list-style-type: none;
  text-align: left !important;
}
</style>
