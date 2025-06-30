const initialCards = [
  {
    name: "Aruba",
    link: "./images/aruba.JPG",
  },
  {
    name: "Berlin Skyline",
    link: "./images/berlin-skyline.jpg",
  },
  {
    name: "Canyon, New York",
    link: "./images/canyon.JPG",
  },
  {
    name: "Quartz Quarry, Italy",
    link: "./images/quarry-crane.jpg",
  },
  {
    name: "Val Masino, Italy",
    link: "./images/val-masino.JPG",
  },
  {
    name: "Split, Croatia",
    link: "./images/split.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-btn");

const modal = document.querySelector("#edit-profile-modal");

const closeButton = modal.querySelector(".modal__close-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

const profileFormElement = modal.querySelector(".modal__form");

const addButton = document.querySelector(".profile__add-btn");

const newPostModal = document.querySelector("#new-post-modal");

const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-image-input");
const captionInput = newPostModal.querySelector("#card-caption-input");

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

  addCardFormElement.reset();

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

initialCards.forEach((card) => {
  console.log(card.name);
});
