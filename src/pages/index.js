import { enableValidation, resetValidation, validationConfig } from "../scripts/validation.js";
import "./index.css";
import img1 from "../images/1-squamish.JPG";
import img2 from "../images/2-prospect.JPG";
import img3 from "../images/3-NF-FC.JPG";
import img4 from "../images/4-aruba.JPG";
import img5 from "../images/5-val-di-mello.JPG";
import img6 from "../images/6-red-rocks.jpg";
import img7 from "../images/7-vasquez-rocks.JPG";

const initialCards = [
  {
    name: "Squamish, BC",
    link: img1,
  },
  {
    name: "Prospect Park",
    link: img2,
  },
  {
    name: "New York",
    link: img3,
  },
  {
    name: "Aruba",
    link: img4,
  },
  {
    name: "Val di Mello",
    link: img5,
  },
  {
    name: "Red Rocks",
    link: img6,
  },
  {
    name: "Vasquez Rocks",
    link: img7,
  },
];

const editProfileButton = document.querySelector(".profile__edit-btn");

const profileModal = document.querySelector("#edit-profile-modal");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

const profileFormElement = profileModal.querySelector(".modal__form");

const addButton = document.querySelector(".profile__add-btn");

const newPostModal = document.querySelector("#new-post-modal");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-image-input");
const captionInput = newPostModal.querySelector("#card-caption-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewCaption = previewImageModal.querySelector(".modal__caption");

// Escape key handler for open modals
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;

    previewImage.onload = () => {
      if (previewImage.naturalWidth > previewImage.naturalHeight) {
        previewImageModal.classList.add("landscape");
        previewImageModal.classList.remove("portrait");
      } else {
        previewImageModal.classList.add("portrait");
        previewImageModal.classList.remove("landscape");
      }
    };

    openModal(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-btn_active");
  });

  deleteButton.addEventListener("click", () => {
    const cardToDelete = deleteButton.closest(".card");
    cardToDelete.remove();
  });

  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
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

  closeModal(profileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value,
  };

  renderCard(newCardData);

  // After successful submit: reset fields and validation state, disable button
  addCardFormElement.reset();
  resetValidation(addCardFormElement, validationConfig);
  closeModal(newPostModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent.trim();
  descriptionInput.value = profileDescription.textContent.trim();
  // Ensure form is valid and clean of messages when opened
  resetValidation(profileFormElement, validationConfig);
  openModal(profileModal);
});

addButton.addEventListener("click", () => {
  openModal(newPostModal);
});

const closeButtons = document.querySelectorAll(".modal__close-button");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Close modal by clicking on the overlay (outside the modal container)
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal || evt.target.closest(".modal__close-button")) {
      closeModal(modal);
    }
  });
});

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

// Initialize validation
enableValidation(validationConfig);
