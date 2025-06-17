const editProfileButton = document.querySelector(".profile__edit-btn");
console.log("Edit Profile button:", editProfileButton);

const modal = document.querySelector("#edit-profile-modal");
console.log("Modal:", modal);

const closeButton = modal.querySelector(".modal__close-button");
console.log("Close button:", closeButton);

editProfileButton.addEventListener("click", () => {
  modal.classList.add("modal_is-opened");
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("modal_is-opened");
});

const addButton = document.querySelector(".profile__add-btn");
console.log("New Post button:", addButton);

const newPostModal = document.querySelector("#new-post-modal");
console.log("New Post modal:", newPostModal);

const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
console.log("New Post close button:", newPostCloseButton);

addButton.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", () => {
  newPostModal.classList.remove("modal_is-opened");
});
