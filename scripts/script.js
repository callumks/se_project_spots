console.log("✅ Script is connected! Hello from index.js");

// Select the Edit Profile button
const editProfileButton = document.querySelector(".profile__edit-btn");
console.log("Edit Profile button:", editProfileButton);

// Select the modal by its id
const modal = document.querySelector("#edit-profile-modal");
console.log("Modal:", modal);

// Select the close button using querySelector on the modal element
const closeButton = modal.querySelector(".modal__close-button");
console.log("Close button:", closeButton);

// When the "Edit Profile" button is clicked, add the modal_is-opened class
editProfileButton.addEventListener("click", () => {
  modal.classList.add("modal_is-opened");
});

// When the close button is clicked, remove the modal_is-opened class
closeButton.addEventListener("click", () => {
  modal.classList.remove("modal_is-opened");
});

// Select the New Post button
const addButton = document.querySelector(".profile__add-btn");
console.log("New Post button:", addButton);

// Select the new post modal by its id
const newPostModal = document.querySelector("#new-post-modal");
console.log("New Post modal:", newPostModal);

// Select the close button using querySelector on the new post modal element
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
console.log("New Post close button:", newPostCloseButton);

// When the "New Post" button is clicked, add the modal_is-opened class
addButton.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-opened");
});

// When the new post close button is clicked, remove the modal_is-opened class
newPostCloseButton.addEventListener("click", () => {
  newPostModal.classList.remove("modal_is-opened");
});
