import { enableValidation, resetValidation, validationConfig } from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "570f0300-0a30-4a5e-b5dd-c11067412ce5",
    "Content-Type": "application/json",
  },
});

const editProfileButton = document.querySelector(".profile__edit-btn");

const profileModal = document.querySelector("#edit-profile-modal");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

const profileFormElement = profileModal.querySelector(".modal__form");
const profileSubmitButton = profileModal.querySelector(".modal__submit-button");

const addButton = document.querySelector(".profile__add-btn");

const newPostModal = document.querySelector("#new-post-modal");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const addCardSubmitButton = newPostModal.querySelector(".modal__submit-button");
const linkInput = newPostModal.querySelector("#card-image-input");
const captionInput = newPostModal.querySelector("#card-caption-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewCaption = previewImageModal.querySelector(".modal__caption");

const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteCardForm = deleteCardModal.querySelector(".modal__form");
const deleteCancelButton = deleteCardModal.querySelector(".modal__cancel-button");
const deleteSubmitButton = deleteCardModal.querySelector(".modal__submit-button");

const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const avatarLinkInput = editAvatarModal.querySelector("#avatar-link-input");
const avatarEditButton = document.querySelector(".profile__avatar-edit-btn");

// Variables to store the current selected card and its ID
let selectedCard;
let selectedCardId;

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
  // API may return isLiked boolean or likes array
  const isLiked = data.isLiked || (data.likes && data.likes.some((user) => {
    // Handle both object format {_id: ...} and string ID format
    const userId = typeof user === 'object' ? user._id : user;
    return userId === currentUserId;
  }));
  if (isLiked) {
    likeButton.classList.add("card__like-btn_active");
  }

  // Only show delete button if current user owns the card
  // owner is a string ID in the API response
  if (data.owner && data.owner !== currentUserId) {
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
          // Update UI based on API response
          if (updatedCard.isLiked === false) {
            likeButton.classList.remove("card__like-btn_active");
          }
        })
        .catch((err) => {
          console.error("Error disliking card:", err);
        });
    } else {
      api.likeCard(data._id)
        .then((updatedCard) => {
          // Update UI based on API response
          if (updatedCard.isLiked === true) {
            likeButton.classList.add("card__like-btn_active");
          }
        })
        .catch((err) => {
          console.error("Error liking card:", err);
        });
    }
  });

  deleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(evt, data);
  });

  return cardElement;
}

let currentUserId = null;

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item, currentUserId);
  cardsList[method](cardElement);
}

// Handle delete card button click - opens confirmation modal
function handleDeleteCard(evt, data) {
  // Get the actual card element from the DOM using the event target
  selectedCard = evt.target.closest(".card");
  selectedCardId = data._id;
  openModal(deleteCardModal);
}

// Handle delete confirmation form submission
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  
  // Show loading state
  const originalText = deleteSubmitButton.textContent;
  deleteSubmitButton.textContent = "Deleting...";
  deleteSubmitButton.disabled = true;
  
  api.deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
      // Clear the selected card references
      selectedCard = null;
      selectedCardId = null;
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    })
    .finally(() => {
      // Restore button state
      deleteSubmitButton.textContent = originalText;
      deleteSubmitButton.disabled = false;
    });
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

  // Show loading state
  const originalText = profileSubmitButton.textContent;
  profileSubmitButton.textContent = "Saving...";
  profileSubmitButton.disabled = true;

  api.updateUserInfo({
    name: newName,
    about: newDescription,
  })
    .then((userData) => {
      // Update profile info with server response
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      if (userData.avatar) {
        profileAvatar.src = userData.avatar;
        profileAvatar.alt = userData.name;
      }
      closeModal(profileModal);
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      // Restore button state
      profileSubmitButton.textContent = originalText;
      profileSubmitButton.disabled = false;
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value,
  };

  // Show loading state
  const originalText = addCardSubmitButton.textContent;
  addCardSubmitButton.textContent = "Saving...";
  addCardSubmitButton.disabled = true;

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
    })
    .finally(() => {
      // Restore button state
      addCardSubmitButton.textContent = originalText;
      addCardSubmitButton.disabled = false;
    });
}

// Handle avatar update form submission
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const avatarLink = avatarLinkInput.value;

  if (!avatarLink) {
    return;
  }

  // Show loading state
  const avatarSubmitButton = editAvatarForm.querySelector(".modal__submit-button");
  const originalText = avatarSubmitButton.textContent;
  avatarSubmitButton.textContent = "Saving...";
  avatarSubmitButton.disabled = true;

  api.updateUserAvatar({
    avatar: avatarLink,
  })
    .then((userData) => {
      // Update avatar with server response
      if (userData.avatar) {
        profileAvatar.src = userData.avatar;
        profileAvatar.alt = userData.name;
      }
      closeModal(editAvatarModal);
      editAvatarForm.reset();
      resetValidation(editAvatarForm, validationConfig);
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => {
      // Restore button state
      avatarSubmitButton.textContent = originalText;
      avatarSubmitButton.disabled = false;
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);
deleteCardForm.addEventListener("submit", handleDeleteSubmit);
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

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

avatarEditButton.addEventListener("click", () => {
  avatarLinkInput.value = profileAvatar.src;
  resetValidation(editAvatarForm, validationConfig);
  openModal(editAvatarModal);
});

deleteCancelButton.addEventListener("click", () => {
  closeModal(deleteCardModal);
  // Clear the selected card references
  selectedCard = null;
  selectedCardId = null;
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

// Load initial data - cards should be rendered after user information is received
api.getInitialData()
  .then(([userData, cardsData]) => {
    // Set current user ID for card ownership checks
    currentUserId = userData._id;

    // Update profile info (name, about, and avatar)
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    if (userData.avatar) {
      profileAvatar.src = userData.avatar;
      profileAvatar.alt = userData.name;
    }

    // Render cards after user information is received
    cardsData.forEach((cardData) => {
      renderCard(cardData);
    });
  })
  .catch((err) => {
    console.error("Error loading initial data:", err);
  });

// Initialize validation
enableValidation(validationConfig);
