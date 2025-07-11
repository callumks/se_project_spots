const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Lake Louise",
    link: "./images/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "Bald Mountains",
    link: "./images/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Latemar",
    link: "./images/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "./images/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/6-photo-by-moritz-feldmann-from-pexels.jpg",
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

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

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

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value,
  };

  const newCardElement = getCardElement(newCardData);
  cardsList.prepend(newCardElement);

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

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});
