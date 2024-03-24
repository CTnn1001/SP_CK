import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBD16QxxoyiaehXmKE6z_YpMVUfvYeSPMc",
    authDomain: "new2-25ec7.firebaseapp.com",
    projectId: "new2-25ec7",
    storageBucket: "new2-25ec7.appspot.com",
    messagingSenderId: "477426858355",
    appId: "1:477426858355:web:ac92d7d27a6bde4e9ded06"
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