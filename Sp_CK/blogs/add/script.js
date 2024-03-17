import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


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
const auth = getAuth(app);
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('title').value = user.displayName;
    } else {
        console.log("Người dùng đăng xuất");
    }
});

document.getElementById('add_button').addEventListener('click', async function () {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0];

    try {
        let imageURL = '';
        if (image) {
            imageURL = await uploadImage(image);
        }

        const docRef = await addDoc(collection(db, "blogs"), {
            title: title,
            content: content,
            imageURL: imageURL,
            username: auth.currentUser.displayName
        });
        console.log("Đã thêm thành công");

        document.getElementById('title').value = '';
        document.getElementById('content').value = '';

    } catch (e) {
        console.error("Lỗi khi thêm: ", e);
    }
});

const blogsCollection = collection(db, "blogs");
onSnapshot(blogsCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            const blogData = change.doc.data();
            displayBlogPost(blogData, change.doc.id);
        }
    });
});

function displayBlogPost(blogData, blogId) {
    const newDiv = document.createElement('div');
    newDiv.className = 'blog-post-new';

    newDiv.innerHTML = `
        <h3 class="titile">${blogData.title}</h3>
        <div class="blog-info-new">
            <p>Đăng vào: ${new Date().toLocaleString()}</p>
            <p>Bởi: ${blogData.username}</p>
        </div>
        <div class="blog-image-new">
            <img src="${blogData.imageURL}" alt="Ảnh của bài viết">
        </div>
        <div class="content">
            <p>${blogData.content}</p>
        </div>
        <div class="read-more-new">
            <a href="#">Xem Thêm</a>
            <button class="delete-button" data-blog-id="${blogId}">Xóa</button>
        </div>
    `;

    const tempDiv = document.querySelector('.temp');
    const blogContainerReDiv = tempDiv.querySelector('#blog-container-re');
    blogContainerReDiv.appendChild(newDiv);

    const deleteButton = newDiv.querySelector('.delete-button');
    deleteButton.addEventListener('click', async () => {
        const blogIdToDelete = deleteButton.getAttribute('data-blog-id'); 
        try {
            await deleteBlogPost(blogIdToDelete);
            newDiv.remove(); 
            console.log("Đã xóa thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa: ", error);
        }
    });
}

async function deleteBlogPost(blogId) {
    await deleteDoc(doc(db, "blogs", blogId));
}

async function uploadImage(image) {
  const storageRef = ref(storage, image.name); 
  const snapshot = await uploadBytes(storageRef, image); 
  return getDownloadURL(snapshot.ref); 
}


