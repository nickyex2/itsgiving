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

const store = createStore({
  state: {
    user: null,
    authState: false,
    editUser: false,
  },
  getters: {
    user(state) {
      return state.user;
    },
    editUser(state) {
      return state.editUser;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuthState(state, payload) {
      state.authState = payload;
    },
    setEditUser(state, payload) {
      state.editUser = payload;
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
    editProfile({ commit }, payload) {
      commit("setEditUser", payload);
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
