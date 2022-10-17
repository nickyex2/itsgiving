import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5Bek2QfWvgPEQUoItnHgmxcCpBf9Gdx8",
  authDomain: "its-giving.firebaseapp.com",
  projectId: "its-giving",
  storageBucket: "its-giving.appspot.com",
  messagingSenderId: "670555576442",
  appId: "1:670555576442:web:86b3666a1dae3bab9383c3",
  measurementId: "G-HCG1SQYYPJ",
  // The value of `databaseURL` depends on the location of the database
  databaseURL:
    "https://its-giving-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
const storage = getStorage(app);
export { db, auth, storage };
