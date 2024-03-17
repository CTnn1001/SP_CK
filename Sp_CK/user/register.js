import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDYf8fuZWbGIiQuoeu88HHrUMhS7H4DbYs",
    authDomain: "new1-9a866.firebaseapp.com",
    projectId: "new1-9a866",
    storageBucket: "new1-9a866.appspot.com",
    messagingSenderId: "354048436292",
    appId: "1:354048436292:web:c5f537ef83622179bcb411"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

var reg = document.getElementById("reg");

reg.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Đã đăng kí thành công!")
            window.location.href = "/index.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage)
        });
})