// Function to display full content of a blog post in a modal
function displayFullContent(blogData) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalTitle = document.createElement('h3');
    modalTitle.textContent = blogData.title;
    modalContent.appendChild(modalTitle);

    const modalImage = document.createElement('img');
    modalImage.src = blogData.imageURL;
    modalImage.alt = "Image";
    modalContent.appendChild(modalImage);

    const modalText = document.createElement('p');
    modalText.textContent = blogData.content;
    modalContent.appendChild(modalText);

    const closeButton = document.createElement('button');
    closeButton.textContent = "Đóng";
    closeButton.addEventListener('click', () => {
        modalContainer.remove();
    });
    modalContent.appendChild(closeButton);

    modalContainer.appendChild(modalContent);

    document.body.appendChild(modalContainer);
}

// Function to display summary of a blog post
function displayBlogPost(blogData, container) {
    const newDiv = document.createElement('div');
    newDiv.className = 'blog-post';

    newDiv.innerHTML = `
        <h3 class="title">${blogData.title}</h3>
        <div class="blog-image">
            <img src="${blogData.imageURL}" alt="">
        </div>
        <div class="blog-info">
            <p>Đăng vào: ${new Date().toLocaleString()}</p>
            <p>Bởi: ${blogData.username}</p>
        </div>
        <p>${blogData.content.substring(0, 200)}</p>
        <div class="read-more">
            <a href="#" class="read-more-link">Xem Thêm</a>
        </div>
    `;

    container.appendChild(newDiv);

    const readMoreLink = newDiv.querySelector('.read-more-link');
    readMoreLink.addEventListener('click', (event) => {
        event.preventDefault();
        displayFullContent(blogData);
    });
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBD16QxxoyiaehXmKE6z_YpMVUfvYeSPMc",
    authDomain: "new2-25ec7.firebaseapp.com",
    projectId: "new2-25ec7",
    storageBucket: "new2-25ec7.appspot.com",
    messagingSenderId: "477426858355",
    appId: "1:477426858355:web:ac92d7d27a6bde4e9ded06"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getPostsList() {
    const snapshot = await getDocs(collection(db, "blogs"));
    const postsList = [];
    snapshot.forEach((doc) => {
        const blogData = doc.data();
        postsList.push(blogData);
    });
    return postsList;
}

function displayBlogPosts(container, startIndex, postsList) {
    container.innerHTML = '';
    for (let i = startIndex; i < startIndex + 3 && i < postsList.length; i++) {
        const blogData = postsList[i];
        displayBlogPost(blogData, container);
    }
}

function nextPosts() {
    startIndex = (startIndex + 3) % postsList.length;
    displayBlogPosts(blogContainer, startIndex, postsList);
}

function prevPosts() {
    startIndex = (startIndex - 3 + postsList.length) % postsList.length;
    displayBlogPosts(blogContainer, startIndex, postsList);
}

const blogContainer = document.getElementById('blog-container');

const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

prevButton.addEventListener('click', prevPosts);
nextButton.addEventListener('click', nextPosts);

let postsList = [];
let startIndex = 0; 

getPostsList().then((list) => {
    postsList = list;
    displayBlogPosts(blogContainer, startIndex, postsList);
});

setInterval(nextPosts, 5000);


const blogContainerRe = document.getElementById('blog-container-re');
const blogsCollectionRe = collection(db, "blogs");
onSnapshot(blogsCollectionRe, (snapshot) => {
  blogContainerRe.innerHTML = '';

  let displayedPosts = 0; 

  snapshot.forEach((doc) => {
      if (displayedPosts < 1) { 
          const blogData = doc.data();
          displayBlogPost(blogData, blogContainerRe);
          displayedPosts++;
      } else {
          return; 
      }
  });
});
