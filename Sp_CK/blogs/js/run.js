// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyDYf8fuZWbGIiQuoeu88HHrUMhS7H4DbYs",
//     authDomain: "new1-9a866.firebaseapp.com",
//     projectId: "new1-9a866",
//     storageBucket: "new1-9a866.appspot.com",
//     messagingSenderId: "354048436292",
//     appId: "1:354048436292:web:c5f537ef83622179bcb411"
//   };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// document.addEventListener('DOMContentLoaded', function () {
//     const container = document.getElementById('blog-container');
//     const prevBtn = document.getElementById('prev-btn');
//     const nextBtn = document.getElementById('next-btn');

//     let currentIndex = 0;
//     const visiblePostCount = 3;
//     const intervalTime = 5000;

//     async function fetchBlogPosts() {
//         const querySnapshot = await getDocs(collection(db, 'blogs'));
//         const posts = querySnapshot.docs.map(doc => doc.data());
//         renderBlogPosts(posts);
//     }

//     function renderBlogPosts(posts) {
//         container.innerHTML = '';

//         for (let i = currentIndex; i < currentIndex + visiblePostCount && i < posts.length; i++) {
//             const post = posts[i];
//             const newDiv = document.createElement('div');
//             newDiv.className = 'blog-post';
//             newDiv.innerHTML = `
//                 <h3>${post.title}</h3>
//                 <div class="blog-image">
//                     <img src="${post.imageURL}" alt="">
//                 </div>
//                 <div class="blog-info">
//                     <p>Đăng vào: ${new Date(post.timestamp).toLocaleString()}</p>
//                     <p>Bởi: ${post.author}</p>
//                 </div>
//                 <p>${post.content}</p>
//                 <div class="read-more">
//                     <a href="#">Xem Thêm</a>
//                 </div>
//             `;
//             container.appendChild(newDiv);
//         }

//         showPosts();
//     }

//     function showPosts() {
//         const posts = container.querySelectorAll('.blog-post');
//         posts.forEach((post, index) => {
//             if (index >= currentIndex && index < currentIndex + visiblePostCount) {
//                 post.style.display = 'flex';
//             } else {
//                 post.style.display = 'none';
//             }
//         });
//     }

//     function nextPost() {
//         currentIndex++;
//         fetchBlogPosts();
//     }

//     function prevPost() {
//         currentIndex--;
//         if (currentIndex < 0) {
//             currentIndex = 0;
//         }
//         fetchBlogPosts();
//     }

//     nextBtn.addEventListener('click', nextPost);
//     prevBtn.addEventListener('click', prevPost);

//     fetchBlogPosts();

//     setInterval(nextPost, intervalTime);
// });
