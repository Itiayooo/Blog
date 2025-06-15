let mainText = document.getElementById('mainText')
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || []
let userDisplayName = JSON.parse(localStorage.getItem('displayName')) || []
// let successfulPosts = JSON.parse(localStorage.getItem('posts')) || [];

if (currentUser) {
    mainText.innerHTML = `${currentUser.userName}`
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

    if (postText === "") {
        alert('You cannot send an empty post');
        return;
    }

    successfulPosts.push(postText);
    let index = successfulPosts.length - 1;

    document.querySelector(".posts-container").innerHTML += `
        <div class="post" id="post-${index}">

            <div class="profile-photo-holder">
                <img class="profile-photo-post"
                     src="https://pbs.twimg.com/profile_images/1728846511327391744/o0m4cspY_normal.jpg" alt="">
            </div>

            <div class="post-ii">
                <p class="post-user"><span>${userDisplayName.toUpperCase()}</span>@${currentUser.userName}</p>
                <p class="post-text">${postText}</p>

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

        // if (postText == "") {
        //     centerTexts.style.display = "none";
        // } else{
        //     centerTexts.style.display = "block";
        // }

    centerTexts.style.display = 'none'
    alert('Post Sent Successfully');
    // localStorage.setItem('posts', JSON.stringify(successfulPosts));
}


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
                        src="https://pbs.twimg.com/profile_images/1728846511327391744/o0m4cspY_normal.jpg" alt="">
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

// function displaySavedPosts() {
//     let container = document.querySelector(".posts-container");

//     successfulPosts.forEach((postText, index) => {
//         container.innerHTML += `
//             <div class="post" id="post-${index}">
//                 <div class="profile-photo-holder">
//                     <img class="profile-photo-post"
//                         src="https://pbs.twimg.com/profile_images/1728846511327391744/o0m4cspY_normal.jpg" alt="">
//                 </div>
//                 <div class="post-ii">
//                     <p class="post-user"><span>${userDisplayName.toUpperCase()}</span>@${currentUser.userName}</p>
//                     <p class="post-text">${postText}</p>

//                     <button class="like-buttons" onclick="toggleLikes(this)">
//                         <i class="fa-regular fa-heart heart-i" style="display: block;"></i>
//                         <i class="fa-solid fa-heart heart-ii" style="display: none;"></i>
//                     </button>

//                     <button class="bookmark-buttons" onclick="toggleBookmark(this)">
//                         <i class="fa-regular fa-bookmark bookmark-i" style="display:block;"></i>
//                         <i class="fa-solid fa-bookmark bookmark-ii" style="display:none;"></i>
//                     </button>

//                     <i class="fa-solid fa-trash" onclick="deletePost(${index})"></i>
//                 </div>
//             </div>`;
//     });
// }

// displaySavedPosts();

let displayName = document.getElementById('displayName')
displayName.innerHTML = `${userDisplayName.toUpperCase()}`




