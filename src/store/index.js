import { createStore } from "vuex";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// user store when user is logged in
// user info (name, email, password, photoURL, uid)
// user additional info (phone, teleHandle, interests, address(not implemented yet), )
const store = createStore({
  state: {
    user: null,
    userAddInfo: null,
    authState: false,
    editUserBool: false,
  },
  getters: {
    user(state) {
      return state.user;
    },
    editUserBool(state) {
      return state.editUserBool;
    },
    userAddInfo(state) {
      return state.userAddInfo;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuthState(state, payload) {
      state.authState = payload;
    },
    setEditUserBool(state, payload) {
      state.editUserBool = payload;
    },
    setUserAddInfo(state, payload) {
      state.userAddInfo = payload;
    },
  },
  actions: {
    async login({ commit }, payload) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      if (userCredential) {
        commit("setUser", userCredential.user);
        commit("setAuthState", true);
      } else {
        throw new Error("Login failed");
      }
    },
    logout({ commit }) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          commit("setUser", null);
        })
        .catch((error) => {
          // An error happened.
          throw new Error(error.message);
        });
    },
    async signup({ commit }, payload) {
      const storage = getStorage();
      const storageRef = ref(storage, "defaultProfilePic.png");
      const photoURL = await getDownloadURL(storageRef);
      const response = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      if (response) {
        // Signed in
        const user = response.user;
        updateProfile(user, {
          displayName: payload.userName,
          photoURL: photoURL,
        });
        commit("setUser", user);
      } else {
        throw new Error("Could not complete Signup");
      }
    },
    editProfileBool({ commit }, payload) {
      commit("setEditUserBool", payload);
    },
  },
  modules: {},
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit("setUser", user);
    console.log("user state changed", user);
    store.commit("setAuthState", true);
  } else {
    store.commit("setUser", null);
    store.commit("setAuthState", false);
  }
});

export default store;
