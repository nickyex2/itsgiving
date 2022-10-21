import { createStore } from "vuex";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import VuexPersist from "vuex-persist";
// import getUserAddInfo from "../services/getUserAddInfo";
import { getDatabase, ref as dbRefe, onValue, set } from "firebase/database";

// user store when user is logged in
// user info (name, email, password, photoURL, uid)
// user additional info (phone, teleHandle, interests, address(not implemented yet), )
const cookieEnabled = navigator.cookieEnabled;

let store = null;
if (cookieEnabled) {
  const vuexLocalStorage = new VuexPersist({
    key: "vuex",
    storage: window.sessionStorage,
  });

  store = createStore({
    plugins: [vuexLocalStorage.plugin],
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
          // const userAddInfo = await getUserAddInfo(userCredential.user.uid);
          // commit("setUserAddInfo", userAddInfo);
        } else {
          throw new Error("Login failed");
        }
      },
      logout({ commit }) {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            commit("setUser", null);
            commit("setUserAddInfo", null);
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
          await updateProfile(user, {
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
      setUserAddInfo({ commit }, payload) {
        const db = getDatabase();
        const dbRef = dbRefe(db, `users/${payload}`);
        // var snapshotValue = null;
        onValue(dbRef, (snapshot) => {
          commit("setUserAddInfo", snapshot.val());
          // snapshotValue = snapshot.val();
          // console.log(snapshotValue);
        });
      },
      async makeUserAddInfo({ commit }, payload) {
        // entire function needs to use payload.value as it sends the entire ref object
        const user = this.getters.user;
        if (payload.value.profilePicture !== "") {
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `profilePics/${payload.value.profilePicture.name}`
          );
          console.log(storageRef);
          await uploadBytes(storageRef, payload.value.profilePicture);
          const photoURL = await getDownloadURL(storageRef);
          await updateProfile(user, {
            displayName: user.displayName,
            photoURL: photoURL,
          });
        }
        delete payload.value.profilePicture;
        // send user additional info to database
        const db = getDatabase();
        const dbRef = dbRefe(db, `users/${user.uid}`);
        try {
          await set(dbRef, payload.value);
          console.log("user additional info updated");
          commit("setUserAddInfo", payload.value);
        } catch (error) {
          console.log(error);
        }
      },
    },
    modules: {},
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.commit("setUser", user);
      // need to remove this line
      console.log("user state changed", user);
      store.commit("setAuthState", true);
    } else {
      store.commit("setUser", null);
      // store.commit("setUserAddInfo", null);
      store.commit("setAuthState", false);
    }
  });
}
export default store;
