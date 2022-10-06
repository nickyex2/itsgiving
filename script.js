// all js functions are defined here

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { // mentioned in firebase documentation that apiKey is safe to be public
    apiKey: "AIzaSyD5Bek2QfWvgPEQUoItnHgmxcCpBf9Gdx8",
    authDomain: "its-giving.firebaseapp.com",
    projectId: "its-giving",
    storageBucket: "its-giving.appspot.com",
    messagingSenderId: "670555576442",
    appId: "1:670555576442:web:a20560da83fc94329383c3",
    measurementId: "G-1MJNECC7G5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);