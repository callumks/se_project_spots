console.log("✅ Script is connected! Hello from index.js");

const editProfileButton = document.querySelector(".profile__edit-btn");
console.log("Edit Profile button:", editProfileButton);

const modal = document.querySelector("#edit-profile-modal");
console.log("Modal:", modal);

const closeButton = modal.querySelector(".modal__close-button");
console.log("Close button:", closeButton);

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

const profileFormElement = modal.querySelector(".modal__form");
console.log("Profile form:", profileFormElement);

const addButton = document.querySelector(".profile__add-btn");
console.log("New Post button:", addButton);

const newPostModal = document.querySelector("#new-post-modal");
console.log("New Post modal:", newPostModal);

const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
console.log("New Post close button:", newPostCloseButton);

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-image-input");
const captionInput = newPostModal.querySelector("#card-caption-input");
console.log("Add card form:", addCardFormElement);
console.log("Link input:", linkInput);
console.log("Caption input:", captionInput);

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  if (!newName || !newDescription) {
    return;
  }

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  closeModal(modal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log("Image link:", linkInput.value);
  console.log("Caption:", captionInput.value);

  linkInput.value = "";
  captionInput.value = "";

  closeModal(newPostModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent.trim();
  descriptionInput.value = profileDescription.textContent.trim();

  openModal(modal);
});

closeButton.addEventListener("click", () => {
  closeModal(modal);
});

addButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});
