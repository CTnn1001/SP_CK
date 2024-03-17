import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYf8fuZWbGIiQuoeu88HHrUMhS7H4DbYs",
  authDomain: "new1-9a866.firebaseapp.com",
  projectId: "new1-9a866",
  storageBucket: "new1-9a866.appspot.com",
  messagingSenderId: "354048436292",
  appId: "1:354048436292:web:c5f537ef83622179bcb411"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogsCollection = collection(db, "blogs");
onSnapshot(blogsCollection, (snapshot) => {
  const blogContainer = document.getElementById('blog-container');
  blogContainer.innerHTML = '';

  let displayedPosts = 0; 

  snapshot.forEach((doc) => {
    if (displayedPosts < 3) { 
      const blogData = doc.data();
      displayBlogPost(blogData, blogContainer);
      displayedPosts++;
    } else {
      return; 
    }
  });
});

function displayBlogPost(blogData, container) {
  const newDiv = document.createElement('div');
  newDiv.className = 'blog-post';

  newDiv.innerHTML = `
    <h3 class="titile">${blogData.title}</h3>
        <div class="blog-image">
            <img src="${blogData.imageURL}" alt="">
        </div>
        <div class="blog-info">
        <p>Đăng vào: ${new Date().toLocaleString()}</p>
            <p>Bởi: ${blogData.username}</p>
        </div>
        <p>${blogData.content}</p>
        <div class="read-more">
            <a href="#">Xem Thêm</a>
        </div>
    `;

  container.appendChild(newDiv);
}

const blogContainerRe = document.getElementById('blog-container-re');
const blogsCollectionRe = collection(db, "blogs");

onSnapshot(blogsCollectionRe, (snapshot) => {
  blogContainerRe.innerHTML = '';

  snapshot.forEach((doc) => {
    const blogData = doc.data();
    displayBlogPostNew(blogData, blogContainerRe);
  });
});

function displayBlogPostNew(blogData, container) {
  const newDiv = document.createElement('div');
  newDiv.className = 'blog-post-new';

  newDiv.innerHTML = `
    <h3 class="title">${blogData.title}</h3>
    <div class="blog-image-new">
      <img src="${blogData.imageURL}" alt="">
    </div>
    <div class="blog-info-new">
      <p>Đăng vào: ${new Date().toLocaleString()}</p>
      <p>Bởi: ${blogData.username}</p>
    </div>
    <div class="content">
      <p>${blogData.content}</p>
    </div>
    <div class="read-more-new">
      <a href="#">Xem Thêm</a>
    </div>
  `;

  container.appendChild(newDiv);
}


