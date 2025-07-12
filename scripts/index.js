const initialCards = [
  {
    name: "Squamish Forest",
    link: "./images/1-squamish.JPG",
  },
  {
    name: "Prospect Park",
    link: "./images/2-prospect.JPG",
  },
  {
    name: "NYC Skyline",
    link: "./images/3-NF-FC.JPG",
  },
  {
    name: "Aruba Desert",
    link: "./images/4-aruba.JPG",
  },
  {
    name: "Val di Mello",
    link: "./images/5-val-di-mello.JPG",
  },
  {
    name: "Red Rocks",
    link: "./images/6-red-rocks.jpg",
  },
  {
    name: "Vasquez Rocks",
    link: "./images/7-vasquez-rocks.JPG",
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

// Preview image modal elements
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewCaption = previewImageModal.querySelector(".modal__caption");
const previewCloseButton = previewImageModal.querySelector(
  ".modal__close-button"
);

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Preview image modal logic
  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
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

// Preview image modal close button
previewCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});
