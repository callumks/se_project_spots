import { enableValidation, resetValidation, validationConfig } from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

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

function getCardElement(data, currentUserId) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Check if current user liked this card
  const isLiked = data.likes && data.likes.some((user) => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-btn_active");
  }

  // Only show delete button if current user owns the card
  if (data.owner && data.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  }

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
    const isCurrentlyLiked = likeButton.classList.contains("card__like-btn_active");
    
    if (isCurrentlyLiked) {
      api.dislikeCard(data._id)
        .then((updatedCard) => {
          likeButton.classList.remove("card__like-btn_active");
        })
        .catch((err) => {
          console.error("Error disliking card:", err);
        });
    } else {
      api.likeCard(data._id)
        .then((updatedCard) => {
          likeButton.classList.add("card__like-btn_active");
        })
        .catch((err) => {
          console.error("Error liking card:", err);
        });
    }
  });

  deleteButton.addEventListener("click", () => {
    api.deleteCard(data._id)
      .then(() => {
        const cardToDelete = deleteButton.closest(".card");
        cardToDelete.remove();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });

  return cardElement;
}

let currentUserId = null;

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item, currentUserId);
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

  api.updateUserInfo({
    name: newName,
    about: newDescription,
  })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(profileModal);
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value,
  };

  api.createCard(newCardData)
    .then((cardData) => {
      renderCard(cardData);
      // After successful submit: reset fields and validation state, disable button
      addCardFormElement.reset();
      resetValidation(addCardFormElement, validationConfig);
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error("Error creating card:", err);
    });
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

// Load initial data
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    // Set current user ID for card ownership checks
    currentUserId = userData._id;

    // Update profile info
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

    // Render cards
    cardsData.forEach((cardData) => {
      renderCard(cardData);
    });
  })
  .catch((err) => {
    console.error("Error loading initial data:", err);
  });

// Initialize validation
enableValidation(validationConfig);
