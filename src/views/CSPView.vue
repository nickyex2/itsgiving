<template>
  <div class="container-fluid mt-5 justify-content-center">
    <div class="cspContent container py-3">
      <div
        class="row justify-content-center my-5"
        data-aos="fade-in"
        data-aos-duration="1500"
      >
        <div class="col-md-7 col-12 order-md-first order-last">
          <!-- dummy carousel -->
          <div
            id="carouselExampleControls1"
            class="carousel slide mx-auto csp-view-carousel carou-gone"
            data-bs-ride="carousel"
            data-bs-interval="5000"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="csp.cover_image" class="d-block w-100" alt="..." />
              </div>
              <div
                class="carousel-item"
                v-for="photo in csp.photos"
                :key="photo"
              >
                <img :src="photo" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls1"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls1"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <!-- end of dummy carousel -->

          <div class="apply-csp my-4" v-if="!editAccess && beforeInterview">
            <div class="mt-2 text-center">
              <h5>Interview Timeslots available:</h5>
            </div>

            <div
              v-for="(times, date) in avail_DateTime.dates_avail"
              :key="date"
              class="justify-content-left py-2 row"
            >
              <div class="col-3 py-2 text-center">
                <b class="pe-4 my-auto">{{ date }}</b>
              </div>
              <div class="col-9">
                <span v-for="time in times" :key="time" class="mx-2">
                  <button
                    :value="`${date} ${time}`"
                    @click="handleAppliedDateTime"
                    class="my-1 interviewbtn"
                  >
                    {{ time }}
                  </button>
                </span>
              </div>
            </div>

            <div class="d-flex justify-content-center mt-2">
              <button
                class="applybtn"
                v-show="applyButtonToggle"
                @click="handleApply"
              >
                Apply Now
              </button>
              <span class="fw-bold ps-2 my-auto" id="apply-text">
                {{ applyMessage }}
              </span>
            </div>
            <span class="mt-2 text-center" v-if="calendarButtonToggle">
              <AddToCalendar
                :cspTitle="csp.name"
                :dateTime="appliedDateTime"
                :intLocation="`TBC`"
              ></AddToCalendar>
            </span>
          </div>
          <div
            class="apply-csp my-4"
            v-else-if="!editAccess && !beforeInterview"
          >
            <div class="mt-2 text-center">
              <h5>
                Interviews are over! Stay tuned for other iterations of this
                event!
              </h5>
            </div>
          </div>
        </div>

        <div class="col-md-5 col-12">
          <!-- dummy carousel -->
          <div
            id="carouselExampleControls"
            class="carousel slide mx-auto csp-view-carousel carou-appear"
            data-bs-ride="carousel"
            data-bs-interval="5000"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="csp.cover_image" class="d-block w-100" alt="..." />
              </div>
              <div
                class="carousel-item"
                v-for="photo in csp.photos"
                :key="photo"
              >
                <img :src="photo" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <!-- end of dummy carousel -->

          <div class="csp-deets mb-3">
            <h2 class="d-inline">{{ csp.name }}</h2>
            <span class="float-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-fill pencil-edit"
                v-if="editAccess"
                viewBox="0 0 16 16"
                @click="handleEditCSP"
              >
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
            </span>
            <h5 class="text-muted">by {{ csp.owner }}</h5>
            <p>{{ csp.description }}</p>
          </div>

          <div class="csp-deets2 mb-4">
            <h5><b>Where:</b> {{ csp.address }}</h5>
            <h5 v-if="csp.date_start !== csp.date_end">
              <b>When:</b> {{ csp.date_start }} - {{ csp.date_end }}
            </h5>
            <h5 v-else><b>When:</b> {{ csp.date_start }}</h5>
            <h5 class="d2-last">
              <b>Est. No of Hours:</b> {{ csp.csp_hours }}h
            </h5>
          </div>

          <div class="row justify-content-between">
            <div
              class="col-lg-5 col-md-11 col-sm-5 col-11 csp-deets3 mb-4 mx-3"
            >
              <h4><b>Supported Causes:</b></h4>
              <ul>
                <li v-for="interest in csp.interest" :key="interest">
                  <img
                    :src="interestImg[interest]"
                    alt=""
                    class="interest-img"
                  />
                  {{ interest }}
                </li>
              </ul>
            </div>

            <div
              class="col-lg-5 col-md-11 col-sm-5 col-11 csp-deets4 mb-4 mx-3"
            >
              <h4><b>Contact Us:</b></h4>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"
                  /></svg
                >{{ csp.owner_email }}
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-telephone-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                  /></svg
                >{{ ownerInfo.phoneNo }}
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-telegram"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"
                  /></svg
                >{{ ownerInfo.telegramHandle }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- card carousel -->
  <div
    class="cc container text-center"
    v-if="!editAccess"
    data-aos="fade-in"
    data-aos-duration="1500"
  >
    <h1 class="explore-title">Related CSPs</h1>
    <div class="row mx-auto my-auto justify-content-center">
      <div
        id="recipeCarousel"
        class="carousel slide carousel-dark"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner unique-inner" role="listbox">
          <CspViewCard
            v-for="(value, id) in randomRelatedCSP"
            :key="id"
            :csp="value"
            :id="id"
          ></CspViewCard>
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
  <ApprovalCsp v-else :cspID="cID" :cspHours="csp.csp_hours"></ApprovalCsp>
  <!-- end -->
</template>

<script>
import { onBeforeMount, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getDatabase,
  ref as dbRefe,
  onValue,
  set,
  update,
  get,
} from "firebase/database";
import { useStore } from "vuex";
import ApprovalCsp from "../components/ApprovalCsp.vue";
import CspViewCard from "../components/CspViewCard.vue";
import AddToCalendar from "../components/AddToCalendar.vue";
export default {
  components: {
    ApprovalCsp,
    CspViewCard,
    AddToCalendar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    // get csp details from route
    const user = computed(() => store.getters.user);
    const userAddInfo = computed(() => store.getters.userAddInfo);
    const editAccess = ref(false);
    const db = getDatabase();
    const cID = route.params.id;
    const interestImg = ref({});
    const beforeInterview = ref(true);
    const randomRelatedCSP = ref([]);
    const csp = ref({
      name: "",
      owner: "",
      description: "",
      address: "",
      date_start: "",
      date_end: "",
      csp_hours: "",
      owner_email: "",
      interest: [],
      cover_image: "",
      photos: [],
      no_of_interviews_per_hour: 0,
    });
    const ownerInfo = ref({
      phoneNo: "",
      telegramHandle: "",
    });
    const avail_DateTime = computed(() => {
      // getting interview timeslot details & remove those that are full
      const avail_DateTime = ref({});
      const applyRef = dbRefe(db, "availability/" + route.params.id);
      onValue(applyRef, (snapshot) => {
        if (snapshot.val()) {
          // console.log(snapshot.val());
          avail_DateTime.value = snapshot.val();
          // if current date is after the end date of interviews, set beforeInterview to false
          if (
            new Date() >
            new Date(
              Object.keys(avail_DateTime.value.dates_avail)[
                Object.keys(avail_DateTime.value.dates_avail).length - 1
              ]
            )
          ) {
            beforeInterview.value = false;
          } else {
            for (let date in avail_DateTime.value.dates_avail) {
              //if date after current date dont store at all (WIP)
              if (new Date(date).getTime() >= new Date().getTime()) {
                for (
                  var timeIndex =
                    avail_DateTime.value.dates_avail[date].length - 1;
                  timeIndex >= 0;
                  timeIndex--
                ) {
                  const currTime =
                    avail_DateTime.value.dates_avail[date][timeIndex];
                  if (
                    avail_DateTime.value.applicants != null &&
                    avail_DateTime.value.applicants[date] != null &&
                    avail_DateTime.value.applicants[date][currTime] != null
                  ) {
                    if (
                      Object.keys(
                        avail_DateTime.value.applicants[date][currTime]
                      ).length >= csp.value.no_of_interviews_per_hour
                    ) {
                      avail_DateTime.value.dates_avail[date].splice(
                        timeIndex,
                        1
                      );
                    }
                  }
                }
              } else {
                delete avail_DateTime.value.dates_avail[date];
              }
            }
          }
        }
      });
      return avail_DateTime.value;
    });
    const applyButtonBool = ref(false);
    const appliedDateTime = ref("");
    const applyMessage = ref("");
    const handleAppliedDateTime = (e) => {
      appliedDateTime.value = e.target.value;
      applyButtonBool.value = true;
    };
    const applyButtonToggle = computed(() => {
      if (applyButtonBool.value) {
        return true;
      } else {
        return false;
      }
    });
    const calendarButtonBool = ref(false);
    const calendarButtonToggle = computed(() => {
      if (calendarButtonBool.value) {
        return true;
      } else {
        return false;
      }
    });
    // applying for csp button
    const handleApply = async () => {
      const dateTimeSplit = appliedDateTime.value.split(" ");
      if (user.value == null) {
        // router.push("/login");
        alert("Please login to apply for this CSP");
      } else if (
        (userAddInfo.value.approved_csp &&
          userAddInfo.value.approved_csp.filter(
            (c) => Object.keys(c)[0] === route.params.id
          ).length > 0) ||
        (userAddInfo.value.pending_csp &&
          userAddInfo.value.pending_csp.filter(
            (c) => Object.keys(c)[0] === route.params.id
          ).length > 0) ||
        (userAddInfo.value.rejected_csp &&
          userAddInfo.value.rejected_csp.includes(route.params.id))
      ) {
        applyMessage.value = "You have already applied for this CSP";
        document.getElementById("apply-text").classList.add("text-danger");
        // this is based on the trust that the tables are created correctly. (need to add in the checking with db maybe)
      } else {
        // storing process
        const applicantsRef = dbRefe(
          db,
          `availability/${route.params.id}/applicants/${dateTimeSplit[0]}/${dateTimeSplit[1]}`
        );
        var applicantsData = null;
        onValue(applicantsRef, (snapshot) => {
          if (snapshot.val() != null) {
            applicantsData = snapshot.val();
          }
        });
        const userAddInfoRef = dbRefe(
          db,
          `users/${user.value.uid}/pending_csp`
        );
        var userAddInfoData = null;
        onValue(userAddInfoRef, (snapshot) => {
          if (snapshot.val() != false) {
            userAddInfoData = snapshot.val();
          }
        });
        // set up user info to store in db
        const applicantInfo = {
          full_name: `${userAddInfo.value.firstName} ${userAddInfo.value.lastName}`,
          email: user.value.email,
          telegramHandle: userAddInfo.value.telegramHandle,
          status: "pending",
        };
        const applicantRef = dbRefe(
          db,
          `availability/${route.params.id}/applicants/${dateTimeSplit[0]}/${dateTimeSplit[1]}/${user.value.uid}`
        );
        if (applicantsData) {
          console.log("user application storing to db now - update()");
          // set db with new applicant
          try {
            await set(applicantRef, applicantInfo);
            applyMessage.value = "You have successfully applied for this CSP";
          } catch (error) {
            applyMessage.value = error.message;
          }
        } else {
          console.log("user application storing to db now - set()");
          // update db with new applicant
          try {
            await update(applicantRef, applicantInfo);
          } catch (error) {
            applyMessage.value = error.message;
          }
        }
        const cspApplication = ref({});
        cspApplication.value[route.params.id] = appliedDateTime.value;
        if (userAddInfoData) {
          // update userAddInfo with csp data
          console.log("updating userAddInfo db");
          const nextKey = userAddInfoData.length;
          console.log(cspApplication.value);
          try {
            await update(userAddInfoRef, {
              [nextKey]: cspApplication.value,
            });
          } catch (error) {
            applyMessage.value = error.message;
          }
        } else {
          // set userAddInfo with csp data
          try {
            await set(userAddInfoRef, [cspApplication.value]);
          } catch (error) {
            applyMessage.value = error.message;
          }
        }
        await store.dispatch("setUserAddInfo", user.value.uid);
        applyMessage.value = "You have successfully applied for this CSP";
        calendarButtonBool.value = true;
        document.getElementById("apply-text").classList.add("text-success");
        console.log("user application storing to db done");
      }
    };
    // owner edit csp button
    const handleEditCSP = () => {
      router.push(`/editcsp/${route.params.id}?edit=true`);
    };
    // things that are done before mounting the DOM
    onBeforeMount(() => {
      // getting csp details
      const cspRef = dbRefe(db, "csp/" + route.params.id);
      onValue(cspRef, (snapshot) => {
        if (snapshot.val()) {
          csp.value.name = snapshot.val().name;
          csp.value.owner = snapshot.val().owner;
          csp.value.description = snapshot.val().description;
          csp.value.address = snapshot.val().location.address;
          csp.value.date_start = snapshot.val().date_start;
          csp.value.date_end = snapshot.val().date_end;
          csp.value.csp_hours = snapshot.val().csp_hours;
          csp.value.owner_email = snapshot.val().owner_email;
          csp.value.interest = snapshot.val().interest;
          csp.value.cover_image = snapshot.val().cover_image;
          csp.value.photos = snapshot.val().photos;
          csp.value.no_of_interviews_per_hour =
            snapshot.val().no_of_interviews_per_hour;
          // getting owner additional information
          const ownerRef = dbRefe(db, "users/" + snapshot.val().owner_uid);
          onValue(ownerRef, (snapshot2) => {
            if (snapshot2.val()) {
              ownerInfo.value.phoneNo = snapshot2.val().phoneNo;
              ownerInfo.value.telegramHandle = snapshot2.val().telegramHandle;
            }
          });
        } else {
          router.replace("/404");
        }
        if (user.value && user.value.email === csp.value.owner_email) {
          editAccess.value = true;
        }
      });
      // getting interest images
      const interestImgRef = dbRefe(db, "interest-image/");
      onValue(interestImgRef, (snapshot) => {
        interestImg.value = snapshot.val();
      });
    });
    onMounted(async () => {
      // get 6 related csps
      const relatedCSP = ref([]);
      const cspdbRef = dbRefe(db, "/csp");
      await get(cspdbRef).then((snapshot) => {
        if (snapshot.exists()) {
          const cspData = snapshot.val();
          const cspKeys = Object.keys(cspData);
          for (let interestTag of csp.value.interest) {
            for (let i = 0; i < cspKeys.length; i++) {
              if (cspData[cspKeys[i]].interest.includes(interestTag)) {
                if (
                  !relatedCSP.value.includes(cspData[cspKeys[i]]) &&
                  cspKeys[i] != route.params.id
                ) {
                  relatedCSP.value.push(cspData[cspKeys[i]]);
                }
                // relatedCSP.value.push(cspData[cspKeys[i]]);
              }
            }
          }
        }
        // get 6 random csps from related csps
        for (let i = 0; i < 6; i++) {
          if (relatedCSP.value.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * relatedCSP.value.length
            );
            randomRelatedCSP.value.push(relatedCSP.value[randomIndex]);
            relatedCSP.value.splice(randomIndex, 1);
          }
        }
      });
    });
    return {
      csp,
      cID,
      randomRelatedCSP,
      beforeInterview,
      editAccess,
      handleEditCSP,
      avail_DateTime,
      interestImg,
      ownerInfo,
      appliedDateTime,
      handleApply,
      handleAppliedDateTime,
      applyButtonToggle,
      applyMessage,
      calendarButtonToggle,
    };
  },
};
</script>
