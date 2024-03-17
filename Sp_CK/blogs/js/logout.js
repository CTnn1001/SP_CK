// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYf8fuZWbGIiQuoeu88HHrUMhS7H4DbYs",
  authDomain: "new1-9a866.firebaseapp.com",
  projectId: "new1-9a866",
  storageBucket: "new1-9a866.appspot.com",
  messagingSenderId: "354048436292",
  appId: "1:354048436292:web:c5f537ef83622179bcb411"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const button = document.querySelector("#logout_btn");

button.addEventListener("click", () => {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
});