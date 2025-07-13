const initialCards = [
  {
    name: "Squamish, BC",
    link: "./images/1-squamish.JPG",
  },
  {
    name: "Prospect Park",
    link: "./images/2-prospect.JPG",
  },
  {
    name: "New York",
    link: "./images/3-NF-FC.JPG",
  },
  {
    name: "Aruba",
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

  closeModal(profileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value,
  };

  renderCard(newCardData);

  addCardFormElement.reset();
  closeModal(newPostModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent.trim();
  descriptionInput.value = profileDescription.textContent.trim();

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

initialCards.forEach((cardData) => {
  renderCard(cardData);
});
