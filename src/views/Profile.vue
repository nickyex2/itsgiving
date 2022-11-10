<template>
  <section class="py-4">
    <div class="profile-container container">
      <div class="row">
        <div class="col-lg-5 col-12">
          <img
            :src="user.photoURL"
            alt="avatar"
            class="rounded-circle img-fluid profilephoto"
            style="width: 200px"
          />
        </div>
        <div class="col-lg-7 col-12">
          <div class="card mb-4 new-profile-card">
            <div class="row m-4 p-3">
              <div class="col-10 text-start">
                <h1 class="profile-name">
                  {{ user.displayName
                  }}<img
                    src="../assets/verified.png"
                    alt="verifiedpic"
                    width="40"
                    height="40"
                    class="p-1"
                    v-if="userVerifiedBool"
                    title="Account Email verified"
                  /><img
                    src="../assets/unverified.png"
                    alt="verifiedpic"
                    width="40"
                    height="40"
                    class="p-1"
                    v-else
                    title="Account Email not yet verified"
                  />
                </h1>
                <p class="text-muted mb-4 role">
                  Volunteer<span v-if="userAddInfo.projectLead"
                    >/Project Lead</span
                  >
                </p>
                <div class="row">
                  <div class="col-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-telephone-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                      />
                    </svg>
                    <span class="text-muted" style="margin-left: 10px">{{
                      userAddInfo.phoneNo
                    }}</span>
                  </div>
                  <div class="col-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-telegram"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"
                      />
                    </svg>
                    <span class="text-muted" style="margin-left: 10px">{{
                      userAddInfo.telegramHandle
                    }}</span>
                  </div>
                  <div class="col-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"
                      />
                    </svg>
                    <span class="text-muted" style="margin-left: 10px">{{
                      user.email
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="col-2 text-end d-inline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-fill pencil-edit"
                  viewBox="0 0 16 16"
                  @click="editProfile"
                >
                  <path
                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                  />
                </svg>
              </div>
            </div>

            <div class="row m-4 px-3 profile-deets">
              <div
                class="row col-8 text-start"
                style="align-items: end; margin-bottom: 16px"
              >
                <div style="width: unset; padding-right: 0px">
                  <button
                    class="btn btn-primary me-2"
                    v-if="!userVerifiedBool"
                    @click="handleVerifyEmail"
                  >
                    Verify Email
                  </button>
                </div>
                <div style="width: unset; display: inline-block">
                  <UpdatePassword></UpdatePassword>
                </div>
              </div>
              <div class="col-4 profile-hours">
                <h5>{{ userAddInfo.hours }}</h5>
                <p>Projected Hours Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-12">
          <div class="profile-all card mb-4 mb-lg-0">
            <p class="mb-0 fw-bold i-i-title">Indicated Interests</p>
            <div class="profile-cards card-body p-0 i-i">
              <ul class="list-group list-group-flush rounded-3">
                <li
                  class="list-group-item d-flex align-items-center"
                  v-for="interest in userAddInfo.interest"
                  :key="interest"
                >
                  <img :src="interestImg[interest]" alt="" />
                  <p class="mb-0">{{ interest }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-12">
          <div class="profile-all card mb-4 mb-md-0 profileh">
            <div class="profile-cards card-body">
              <p class="i-i-title-2 fw-bold">Completed / Ongoing CSPs</p>
              <hr />
              <p
                class="mb-1"
                style="font-size: 0.77rem"
                v-for="approv_csp in userAddInfo.approved_csp"
                :key="approv_csp"
              >
                <router-link :to="`/csp/${Object.keys(approv_csp)[0]}`">
                  {{
                    `${Object.keys(approv_csp)[0]} : ${
                      approv_csp[Object.keys(approv_csp)[0]]
                    } hours`
                  }}
                </router-link>
              </p>
              <!-- <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 100%"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> -->
            </div>
          </div>
        </div>

        <div class="col-md-3 col-12">
          <div class="profile-all card mb-4 mb-md-0 profileh">
            <div class="profile-cards card-body">
              <p class="i-i-title-2 fw-bold">Leading Projects</p>
              <hr />
              <p
                class="mb-1"
                style="font-size: 0.77rem"
                v-for="proj_lead in userAddInfo.projectLead"
                :key="proj_lead"
              >
                <router-link :to="`/csp/${proj_lead}`">{{
                  proj_lead
                }}</router-link>
              </p>
              <!-- <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 100%"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> -->
            </div>
          </div>
        </div>

        <div class="col-md-3 col-12">
          <div
            class="profile-all card mb-4 mb-md-0"
            style="height: 142px; overflow-y: auto"
          >
            <div class="profile-cards card-body">
              <p class="i-i-title-2 fw-bold">Pending Applications</p>
              <hr />
              <p
                class="mb-1"
                style="font-size: 0.77rem"
                v-for="pend_csp in userAddInfo.pending_csp"
                :key="pend_csp"
              >
                <router-link :to="`/csp/${Object.keys(pend_csp)[0]}`">
                  {{
                    `${Object.keys(pend_csp)[0]} : ${
                      pend_csp[Object.keys(pend_csp)[0]]
                    }`
                  }}
                </router-link>
              </p>
            </div>
          </div>
          <div
            class="profile-all card mb-4 mb-md-0"
            style="height: 142px; margin-top: 30px; overflow-y: auto"
          >
            <div class="profile-cards card-body">
              <p class="i-i-title-2 fw-bold">Rejected Applications</p>
              <hr />
              <p
                class="mb-1"
                style="font-size: 0.77rem"
                v-for="rej_csp in userAddInfo.rejected_csp"
                :key="rej_csp"
              >
                <router-link :to="`/csp/${rej_csp}`">
                  {{ rej_csp }}
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- end of edit later -->
    </div>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import { getDatabase, ref as dbRefe, onValue } from "firebase/database";
import UpdatePassword from "../components/UpdatePassword.vue";
import { sendEmailVerification } from "firebase/auth";
export default {
  name: "ProfileView",
  components: {
    UpdatePassword,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const db = getDatabase();
    const user = computed(() => store.getters.user);
    const userAddInfo = computed(() => store.getters.userAddInfo);
    const interestImg = ref({});
    const userVerifiedBool = computed(() => {
      if (user.value.emailVerified) {
        return true;
      } else {
        return false;
      }
    });
    const handleVerifyEmail = () => {
      sendEmailVerification(user.value)
        .then(() => {
          alert(
            "Verification email sent. Please check your inbox or spam for the email! Once verified, please refresh the page."
          );
        })
        .catch((error) => {
          if (error) {
            alert("Error sending verification email. Please try again later.");
          }
        });
    };
    const editProfile = () => {
      store.dispatch("editProfileBool", true);
      router.push("/profile/edit");
    };
    onBeforeMount(() => {
      const interestImgRef = dbRefe(db, "interest-image/");
      onValue(interestImgRef, (snapshot) => {
        interestImg.value = snapshot.val();
      });
    });
    // for projected hours
    // 1. get all the approved csp the user has (cid, hours)
    return {
      user,
      editProfile,
      userAddInfo,
      interestImg,
      userVerifiedBool,
      handleVerifyEmail,
    };
  },
};
</script>

<style></style>
