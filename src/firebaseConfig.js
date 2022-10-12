import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5Bek2QfWvgPEQUoItnHgmxcCpBf9Gdx8",
  authDomain: "its-giving.firebaseapp.com",
  projectId: "its-giving",
  storageBucket: "its-giving.appspot.com",
  messagingSenderId: "670555576442",
  appId: "1:670555576442:web:86b3666a1dae3bab9383c3",
  measurementId: "G-HCG1SQYYPJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
