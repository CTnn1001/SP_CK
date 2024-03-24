// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD16QxxoyiaehXmKE6z_YpMVUfvYeSPMc",
  authDomain: "new2-25ec7.firebaseapp.com",
  projectId: "new2-25ec7",
  storageBucket: "new2-25ec7.appspot.com",
  messagingSenderId: "477426858355",
  appId: "1:477426858355:web:ac92d7d27a6bde4e9ded06"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const button = document.querySelector("#logout_btn");

button.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.replace("/index.html");
  }).catch((error) => {
    // An error happened.
  });
});