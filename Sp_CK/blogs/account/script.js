import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js"; // Import các hàm từ Firebase Storage

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDYf8fuZWbGIiQuoeu88HHrUMhS7H4DbYs",
    authDomain: "new1-9a866.firebaseapp.com",
    projectId: "new1-9a866",
    storageBucket: "new1-9a866.appspot.com",
    messagingSenderId: "354048436292",
    appId: "1:354048436292:web:c5f537ef83622179bcb411"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app); 
const addListener = async () => {
    const updateNameButton = document.getElementById("update-name-btn");
    const updatePhotoButton = document.getElementById("update-photo-btn");

    onAuthStateChanged(auth, (user) => {
        if (user) {

            document.getElementById("user-name").textContent = user.displayName || "None";

            const photoURL = user.photoURL;
            if (photoURL) {
                document.getElementById("user-photo").src = photoURL;
            } else {
                document.getElementById("user-photo").src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUH/8QALBABAAIBAgMHBAIDAAAAAAAAAAECAxExBCFBEhRRUlNhkRMiMnFDgQViof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAztfpAL6qzkhnMyAtN7I7VusoANUxaekoFE9u0ddVov4qANYtqswTW0x+kGwrFolYAAAAAAAAAABEzEEzoytaZAtaZ5IBUAAAPgUFJy44nSclY/tMXpP43rP6kRYAAADXTZet/FQFbilLeK6AAAAAAASSpknSAVvPgqCoAAAre0UxzedoBnxGeMNeca2naHnZc18s/dbl0iNlcl5yXte3OZVFDbblPiCK6uH4y2Plk+6vvu9CtovzrOtZ2l4rr4DLNb/TmeVo5fsR6ACoAARya0nWGSazpMCtgEAAAABjfnZradIYzuAAqAADm/wAhOmDSNptES6XNx8a4NY6WiUHmgDQAAmszW0WjeJQtSvavWsbzMCPZCRUAACABrSdYWZY556NUUAAABS+zNfJtCggAoAAK3rGSs0nqsCvHyY5x5Jpboo9XiOHrlrz0i3j4POy4MmKfurPZ83RBmBpMzpAo6+Axa3+ras9mNveUYOEtae1k+2vh1l6FYitYisaRGwiQFQAAABNfyhswjeG6KAAAAzybQo0vszEAFAAAUy5ceLnknT28XJk4+f4qRHvYV3E8t+Tyb8RmvvkmPaOTPtTO8zM+6D1prhtP3Rj/AOLRNK/j2Y/WjxtI3NIB7e48WLWja0w1pxWeu15mPCVHqjix8fGumWn91dePJXJXtUnWBFgAAAI3huxr+UNkUAAABFo1qxbsbRpOgIAVBy8VxX09aY9Jv1mejbPf6WK1/h5EzNpmZnnO4uJtabW7VpmZ90AigAAAAAC2PJbHaLUmYlUB6vDcRGam2l4/KGzx8WScWSL16b+72I5xqrIBALY41nVqrjjSFkUAAAAUyRy1XJBh0EzXRCo5P8jOmKseNnnvV4nBOesVidNJ15ubuFp/kr8CuMdncLepX4O4X9SvwhXGOzuF/Ur8HcL+pX4CuMdncL+pX4R3C/nqFcg644C/nqnuF/PUK4x2dwv56ncL+eoVxvX4ee1gpP8Aq4+4ZPPV24q/TxxTfSNA1dNY1nRDTHGkKLRGkJBAAAAAABFo1ZTGm7ZFoiQYoWmsxKFQAAAAAAAAAACF608wpSvVoCAAAAAAAAAACJjVSacmgDDYazWJVnH5QUEzSyAAAAiJnaFopM78gVTFZnovFKwuCta6brAAAAAAAAAAAAAAAAAAACNBIAAAAAAAAAAAAD//2Q=="; 
            }
        } else {
            console.log("Người dùng chưa đăng nhập.");
        }
    });

    updateNameButton.addEventListener("click", async () => {
        const newName = document.getElementById("new-name").value;
        const user = auth.currentUser;
        if (user) {
            try {
                await updateProfile(user, { displayName: newName });
                console.log("Đã cập nhật tên người dùng thành công");

                await set(ref(database, `users/${user.uid}/displayName`), newName);
            } catch (error) {
                console.error("Lỗi khi cập nhật tên người dùng:", error);
            }
        } else {
            console.error('Người dùng không tồn tại');
        }
    });

    updatePhotoButton.addEventListener("click", async () => {
        const file = document.getElementById("new-photo").files[0];
        const user = auth.currentUser;
        if (user && file) {
            try {
                const storageRefTemp = storageRef(storage, `user-profiles/${user.uid}/${file.name}`);
                await uploadBytes(storageRefTemp, file);

                const photoURL = await getDownloadURL(storageRefTemp);
                await updateProfile(user, { photoURL });
                console.log("Thành công");

                await set(ref(database, `users/${user.uid}/photoURL`), photoURL);
            } catch (error) {
                console.error("Thất bại:", error);
            }
        } else {
            console.error('Người dùng không tồn tại hoặc không có tệp ảnh được chọn');
        }
    });

};

document.addEventListener("DOMContentLoaded", addListener);
