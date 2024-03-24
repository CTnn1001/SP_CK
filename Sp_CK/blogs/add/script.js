import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const auth = getAuth(app);
const storage = getStorage(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        document.getElementById('title').value = currentUser.displayName;
        displayUserPosts(currentUser.uid);
    } else {
        console.log("Người dùng đăng xuất");
    }
});

document.getElementById('add_button').addEventListener('click', async function () {
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const image = document.getElementById('image').files[0];

    if (title === '' || content === '' || !image) {
        alert('Điền đầy đủ: tiêu đề, nội dung, hình ảnh');
        return;
    }

    try {
        let imageURL = '';
        if (image) {
            imageURL = await uploadImage(image);
        }

        const docRef = await addDoc(collection(db, "blogs"), {
            title: title,
            content: content,
            imageURL: imageURL,
            userId: currentUser.uid,
            username: currentUser.displayName
        });
        console.log("Đã thêm thành công");

        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('image').value = ''; 

    } catch (e) {
        console.error("Lỗi khi thêm: ", e);
    }
});


const blogsContainer = document.getElementById('blog-container-re');

function displayUserPosts(userId) {
    const userPostsQuery = query(collection(db, "blogs"), where("userId", "==", userId));
    onSnapshot(userPostsQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                const blogData = change.doc.data();
                displayBlogPost(blogData, change.doc.id);
            }
        });
    });
}

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

    blogsContainer.appendChild(newDiv);

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
