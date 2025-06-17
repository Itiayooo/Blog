let mainText = document.getElementById('mainText')
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || []

if (currentUser?.profilePhoto) {
    document.querySelectorAll(".profile-photo-post").forEach(img => {
        img.src = currentUser.profilePhoto;
    });

    let topPhoto = document.querySelector('.top-profile-photo');
    if (topPhoto) {
        topPhoto.innerHTML = `
            <img class="profile-photo" src="${currentUser.profilePhoto}" alt="">
        `;
    }
}

if (currentUser?.profilePhoto) {
    document.querySelectorAll(".profile-photo-post").forEach(img => {
        img.src = currentUser.profilePhoto;
    });
}


if (currentUser) {
    mainText.innerHTML = `${currentUser.userName}`
    document.getElementById('displayName').innerHTML = currentUser.firstName.toUpperCase();
}

function logOut() {
    let confirmLogOut = confirm('Are you sure you want to log out? You’ll have to sign in again to continue')
    if (confirmLogOut) {
        window.location.href = 'login.html'
    }
}

let modal = document.getElementsByClassName('bs-modal')

let successfulPosts = [];



function addPost() {
    let userPost = document.getElementById('userPost');
    let centerTexts = document.getElementById('centerTexts');
    let postText = userPost.value.trim();

    console.log("Text:", postText);
    console.log("Image:", selectedPostImageData);

    if (postText === "" && !selectedPostImageData) {
        alert('You cannot send an empty post');
        return;
    }

    setTimeout(() => {
        successfulPosts.push({
            content: postText,
            imageUrl: selectedPostImageData
        });

        let index = successfulPosts.length - 1;
        let post = successfulPosts[index];

        document.querySelector(".posts-container").innerHTML += `
            <div class="post" id="post-${index}">
                <div class="profile-photo-holder">
                    <img class="profile-photo-post" style="width: 30px; height: 30px; border-radius: 100%;"
                        src="${JSON.parse(localStorage.getItem('currentUser'))?.profilePhoto || 'user-solid.svg'}"
                        alt="">
                </div>

                <div class="post-ii">
                    <p class="post-user"><span>${currentUser.firstName.toUpperCase()}</span>@${currentUser.userName}</p>
                    <p class="post-text">${post.content}</p>
                    ${post.imageUrl ? `<img class="posted-photo" src="${post.imageUrl}" class="post-photo">` : ""}

                    <button class="like-buttons" tabindex="0" onclick="toggleLikes(this)">
                        <i class="fa-regular fa-heart heart-i" style="color: #181818; display: block;"></i>
                        <i class="fa-solid fa-heart heart-ii" style="color: #181818; display: none;"></i>
                    </button>

                    <button class="bookmark-buttons" tabindex="0" onclick="toggleBookmark(this)">
                        <i class="fa-regular fa-bookmark bookmark-i" style="display:block;"></i>
                        <i class="fa-solid fa-bookmark bookmark-ii" style="display:none;"></i>
                    </button>

                    <i class="fa-solid fa-trash" onclick="deletePost(${index})"></i>
                </div>
            </div>`;

        centerTexts.style.display = 'none';
        alert('Post Sent Successfully');

        userPost.value = "";
        photoInput.value = "";
        selectedPostImageData = "";
        previewImg.style.display = "none";
        previewImg.src = "";

        console.log("selectedPostImageData:", selectedPostImageData);
    }, 1000);
}


// function addPost() {
//     let userPost = document.getElementById('userPost');
//     let centerTexts = document.getElementById('centerTexts');
//     let postText = userPost.value.trim();

//     // Debug logs
//     console.log("Text:", postText);
//     console.log("Image:", selectedPostImageData);

//     if (postText === "" && !selectedPostImageData) {
//         alert('You cannot send an empty post');
//         return;
//     }

//     successfulPosts.push({
//         content: postText,
//         imageUrl: selectedPostImageData
//     });

//     let index = successfulPosts.length - 1;
//     let post = successfulPosts[index];

//     document.querySelector(".posts-container").innerHTML += `
//         <div class="post" id="post-${index}">

//             <div class="profile-photo-holder">
//                 <img class="profile-photo-post" style="width: 30px; height: 30px; border-radius: 100%;"
//                     src="${JSON.parse(localStorage.getItem('currentUser'))?.profilePhoto || 'user-solid.svg'}"
//                         alt="">
//             </div>

//             <div class="post-ii">
//                 <p class="post-user"><span>${currentUser.firstName.toUpperCase()}</span>@${currentUser.userName}</p>


//                 <p class="post-text">${post.content}</p>
//                 ${post.imageUrl ? `<img class="posted-photo" src="${post.imageUrl}" class="post-photo">` : ""}

//                 <button class="like-buttons" tabindex="0" onclick="toggleLikes(this)">
//                     <i class="fa-regular fa-heart heart-i" style="color: #181818; display: block;"></i>
//                     <i class="fa-solid fa-heart heart-ii" style="color: #181818; display: none;"></i>
//                 </button>

//                 <button class="bookmark-buttons" tabindex="0" onclick="toggleBookmark(this)">
//                     <i class="fa-regular fa-bookmark bookmark-i" style="display:block;"></i>
//                     <i class="fa-solid fa-bookmark bookmark-ii" style="display:none;"></i>
//                 </button>

//                 <i class="fa-solid fa-trash" onclick="deletePost(${index})"></i>
//             </div>

//         </div>`;

//     centerTexts.style.display = 'none';
//     alert('Post Sent Successfully');

//     userPost.value = "";
//     photoInput.value = "";
//     selectedPostImageData = "";
//     previewImg.style.display = "none";

//     console.log("selectedPostImageData:", selectedPostImageData);
// }


let selectedPostImageData = ""; 


let currentProfilePhoto = localStorage.getItem("profilePhoto") || ""; 



let photoInput = document.getElementById('photoInput');


let previewImg = document.getElementById('profilePreviewImg');






photoInput.addEventListener('change', function () {
    let file = photoInput.files[0];

    if (!file) {
        alert("Please choose a file.");
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Only image files allowed.");
        return;
    }

    if (file.size < 10000) {
        alert("Image file is too small.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function (e) {
        let imageDataURL = e.target.result;

        selectedPostImageData = imageDataURL;
    };

    reader.readAsDataURL(file);
});


function changeProfilePhoto() {
    if (!uploadedProfileImage) {
        alert("Please select an image first.");
        return;
    }

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("No user is currently logged in.");
        return;
    }

    const button = document.querySelector('.modal-post-button');
    button.textContent = "Changing Profile Photo...";
    button.disabled = true;

    setTimeout(() => {
        currentUser.profilePhoto = uploadedProfileImage;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
        let updatedUsers = allUsers.map(user => {
            if (user.userName === currentUser.userName) {
                return { ...user, profilePhoto: uploadedProfileImage };
            }
            return user;
        });
        localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

        alert("Profile photo updated!");

        document.querySelector('.top-profile-photo').innerHTML = `
            <img class="profile-photo"
                src="${currentUser.profilePhoto}"
                alt="">
        `;

        document.querySelectorAll(".profile-photo-post").forEach(img => {
            img.src = currentUser.profilePhoto;
        });

        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModalii'));
        if (modal) {
            modal.hide();
        }

        previewImg.style.display = "none";
        previewImg.src = "";

        // Reset button
        button.textContent = "Change Profile Photo";
        button.disabled = false;

    }, 1000);
}



let imageInput = document.getElementById('profilePhotoInput');
let profilePreviewImg = document.getElementById('profilePreviewImg');
let uploadedProfileImage = "";

imageInput.addEventListener('change', function () {
    let file = imageInput.files[0];

    if (!file) {
        alert("Please choose a file.");
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Only image files allowed.");
        return;
    }

    if (file.size < 10000) {
        alert("Image file is too small.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function (e) {
        uploadedProfileImage = e.target.result;
        profilePreviewImg.src = uploadedProfileImage;
        profilePreviewImg.style.display = "block";
    };

    reader.readAsDataURL(file);
});


function searchPosts() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let container = document.querySelector(".posts-container");


    let matchedPosts = successfulPosts.filter(text => text.toLowerCase().includes(input));

    container.innerHTML = "";

    matchedPosts.forEach(text => {
        container.innerHTML += `
            <div class="post" id="post">
                <div class="profile-photo-holder">
                    <img class="profile-photo-post"
                        src="user-solid.svg" alt="">
                </div>

                <div class="post-ii">
                    <p class="post-user">@${currentUser.userName}</p>
                    <p class="post-text">${text}</p>

                    <button class="like-buttons" tabindex="0" onclick="toggleLikes(this)">
                        <i class="fa-regular fa-heart heart-i" style="color: #181818; display: block;"></i>
                        <i class="fa-solid fa-heart heart-ii" style="color: #181818; display: none;"></i>
                    </button>

                    <button class="bookmark-buttons" tabindex="0" onclick="toggleBookmark(this)">
                        <i class="fa-regular fa-bookmark bookmark-i" style="display:block;"></i>
                        <i class="fa-solid fa-bookmark bookmark-ii" style="display:none;"></i>
                    </button>

                    <i class="fa-solid fa-trash" onclick=deletePost()></i>
                </div>
            </div>
        `;
    });
}

function toggleLikes(button) {
    let hearti = button.querySelector('.heart-i');
    let heartii = button.querySelector('.heart-ii');

    if (hearti.style.display == 'block') {
        hearti.style.display = 'none';
        heartii.style.display = 'block';
    } else {
        hearti.style.display = 'block';
        heartii.style.display = 'none';
    }
}

function toggleBookmark(button) {
    let bookmarki = button.querySelector('.bookmark-i');
    let bookmarkii = button.querySelector('.bookmark-ii');

    if (bookmarki.style.display == 'block') {
        bookmarki.style.display = 'none';
        bookmarkii.style.display = 'block';
    } else {
        bookmarki.style.display = 'block';
        bookmarkii.style.display = 'none';
    }
}

function deletePost(index) {
    let confirmDelete = confirm("Are you sure you want to delete this post? This action cannot be undone");
    if (confirmDelete) {
        successfulPosts.splice(index, 1);
        document.getElementById(`post-${index}`).remove();
    }
}








