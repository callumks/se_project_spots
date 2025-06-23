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

// Select the profile elements to get current values
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Select the form input fields
const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

// Select the form element from within the modal
const profileFormElement = modal.querySelector(".modal__form");
console.log("Profile form:", profileFormElement);

// Create the form submission handler
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior
  evt.preventDefault();

  // Get the values of each form field from the value property
  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  // Insert these new values into the textContent property of the profile elements
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  // Close the modal
  modal.classList.remove("modal_is-opened");
}

// Set the submit listener
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// When the "Edit Profile" button is clicked, add the modal_is-opened class and populate form
editProfileButton.addEventListener("click", () => {
  // Pre-populate form fields with current profile info
  nameInput.value = profileName.textContent.trim();
  descriptionInput.value = profileDescription.textContent.trim();

  // Open the modal
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

// Select the necessary form elements from inside the new post modal
const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-image-input");
const captionInput = newPostModal.querySelector("#card-caption-input");
console.log("Add card form:", addCardFormElement);
console.log("Link input:", linkInput);
console.log("Caption input:", captionInput);

// Create the form submission handler
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior
  evt.preventDefault();

  // Log both input values to the console
  console.log("Image link:", linkInput.value);
  console.log("Caption:", captionInput.value);

  // Close the modal
  newPostModal.classList.remove("modal_is-opened");
}

// Create the submit listener
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// When the "New Post" button is clicked, add the modal_is-opened class
addButton.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-opened");
});

// When the new post close button is clicked, remove the modal_is-opened class
newPostCloseButton.addEventListener("click", () => {
  newPostModal.classList.remove("modal_is-opened");
});
