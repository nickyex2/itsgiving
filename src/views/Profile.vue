<template>
  <section class="py-5">
    <div class="profile-container container">
      <div class="row">
        <div class="col-lg-4">
          <div class="profile-all card mb-4">
            <div class="profile-cards card-body text-center">
              <img
                :src="user.photoURL"
                alt="avatar"
                class="rounded-circle img-fluid"
                style="width: 150px"
              />
              <h5 class="my-3">{{ user.displayName }}</h5>
              <p class="text-muted mb-4">Volunteer</p>
              <button class="btn btn-primary" @click="editProfile">Edit</button>
            </div>
          </div>
          <div class="profile-all card mb-4 mb-lg-0">
            <div class="profile-cards card-body p-0">
              <ul class="list-group list-group-flush rounded-3">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3"
                >
                  <p class="mb-0 fw-bold">Indicated Interests</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3"
                  v-for="interest in userAddInfo.interest"
                  :key="interest"
                >
                  <p class="mb-0">{{ interest }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="profile-all card mb-4">
            <div class="profile-cards card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0 fw-bold">Display Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.displayName }}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0 fw-bold">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">
                    {{ `${userAddInfo.firstName} ${userAddInfo.lastName}` }}
                  </p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0 fw-bold">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.email }}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0 fw-bold">Phone</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ userAddInfo.phoneNo }}</p>
                </div>
              </div>
              <hr />
              <!-- <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0 fw-bold">Mobile</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">(098) 765-4321</p>
                </div>
              </div>
              <hr /> -->
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0 fw-bold">Telegram</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">
                    {{ userAddInfo.telegramHandle }}
                  </p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0 fw-bold">Address</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          <!-- need to edit later -->
          <div class="row">
            <div class="col-md-6">
              <div class="profile-all card mb-4 mb-md-0">
                <div class="profile-cards card-body">
                  <p class="mb-4 fw-bold">Completed / Ongoing CSPs</p>
                  <p class="mb-1" style="font-size: 0.77rem">CSP A</p>
                  <div class="progress rounded" style="height: 5px">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 100%"
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p class="mt-4 mb-1" style="font-size: 0.77rem">CSP B</p>
                  <div class="progress rounded" style="height: 5px">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 72%"
                      aria-valuenow="72"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile-all card mb-4 mb-md-0">
                <div class="profile-cards card-body">
                  <p class="mb-4 fw-bold">Pending CSPs</p>
                  <hr />
                  <p class="mb-1" style="font-size: 0.77rem">CSP C</p>
                  <p>Date Applied: 15 Oct 2020</p>
                </div>
              </div>
            </div>
          </div>
          <!-- end of edit later -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
export default {
  name: "ProfileView",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.getters.user);
    const userAddInfo = computed(() => store.getters.userAddInfo);
    const editProfile = () => {
      store.dispatch("editProfileBool", true);
      router.push("/profile/edit");
    };
    return { user, editProfile, userAddInfo };
  },
};
</script>

<style></style>
