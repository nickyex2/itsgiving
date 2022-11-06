import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/Profile.vue";
import EditProfile from "../views/EditProfile.vue";
import SearchResults from "../views/SearchResults.vue";
import PageNotFound from "../views/PageNotFound.vue";
import setupProfile from "../views/setupProfile.vue";
import CreateCsp from "../views/CreateCsp.vue";
import CSPView from "../views/CSPView.vue";
import EditCsp from "../views/EditCsp.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/setup",
    name: "setupprofile",
    component: setupProfile,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/profile/edit",
    name: "editprofile",
    component: EditProfile,
  },
  {
    path: "/search",
    name: "search",
    component: SearchResults,
  },
  {
    path: "/create",
    name: "create",
    component: CreateCsp,
  },
  {
    path: "/csp/:id",
    name: "csp",
    component: CSPView,
  },
  {
    path: "/editcsp/:id",
    name: "editcsp",
    component: EditCsp,
  },
  {
    path: "/:catchAll(.*)",
    name: "pagenotfound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
