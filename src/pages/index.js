import "./index.css";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

let escListenerAttached = false;
let currentUserId = null;
let selectedCard = null;
let selectedCardId = null;

function getCardId(obj) {
  if (!obj) return null;
  if (obj._id) return obj._id;
  if (obj.id) return obj.id;
  if (obj.cardId) return obj.cardId;
  if (obj.data && (obj.data._id || obj.data.id))
    return obj.data._id || obj.data.id;
  return null;
}

function onEscKeydown(e) {
  if (e.key === "Escape" || e.key === "Esc") {
    const opened = document.querySelector(".modal_is-opened");
    if (opened) closeModal(opened);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  if (!escListenerAttached) {
    document.addEventListener("keydown", onEscKeydown);
    escListenerAttached = true;
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  if (!document.querySelector(".modal_is-opened") && escListenerAttached) {
    document.removeEventListener("keydown", onEscKeydown);
    escListenerAttached = false;
  }
}

const logo = require("../images/Spots.svg");
const avatar = require("../images/avatar.jpg");
const pencil = require("../images/pencil.svg");
const pencilMobile = require("../images/Pencil-icon-mobile.svg");

const plus = require("../images/Group26.svg");
const closeX = require("../images/Group27.svg");
const previewClose = require("../images/Modalpreview-close.svg");

document.addEventListener("DOMContentLoaded", () => {
  const headerLogo = document.querySelector(".header__logo");
  if (headerLogo) headerLogo.src = logo;

  const profileAvatar = document.querySelector(".profile__avatar");
  if (profileAvatar) profileAvatar.src = avatar;

  const editBtnImg = document.querySelector(".profile__edit-btn img");
  if (editBtnImg) editBtnImg.src = pencil;

  const newPostBtnImg = document.querySelector(".profile__new-post-btn img");
  if (newPostBtnImg) newPostBtnImg.src = plus;

  document
    .querySelectorAll(".modal__close-btn img.close-btn")
    .forEach((img) => {
      img.src = closeX;
    });

  const previewCloseImg = document.querySelector(
    "#preview-modal .modal__close-btn img"
  );
  if (previewCloseImg) previewCloseImg.src = previewClose;
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7fb682c0-63a2-41a6-ace3-d20de6af5ecb",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([user, apiCards]) => {
    currentUserId = user?._id || null;
    console.log(
      "cards response:",
      Array.isArray(apiCards),
      apiCards?.length,
      apiCards?.[0],
      console.log("First card like status:", apiCards[0])
    );
    // user
    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
    const profileAvatarEl = document.querySelector(".profile__avatar");
    if (profileAvatarEl) {
      profileAvatarEl.src = user.avatar;
      profileAvatarEl.alt = user.name;
    }

    // cards
    cardsList.innerHTML = "";
    if (!Array.isArray(apiCards)) {
      console.error("cards is not an array:", apiCards);
      return;
    }

    const allCards = [...apiCards, ...cards];
    allCards.forEach((item) => {
      const el = getCardElement(item);
      cardsList.append(el);
    });
  })
  .catch(console.error);

api
  .getUserInfo()
  .then((user) => {
    console.log(user.name, user.about, user.avatar);
  })
  .catch((err) => console.error(err));

import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";

const cards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["edit-profile-form"];
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileSaveBtn = editProfileModal.querySelector(".modal__submit-btn");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = newPostModal.querySelector("#card-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");
const newPostSaveBtn = newPostModal.querySelector(".modal__submit-btn");

const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");

// Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");
const deleteSubmitBtn = deleteForm.querySelector('button[type="submit"]');
const deleteCancelBtn = deleteForm.querySelector('button[type="button"]');
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");

if (deleteCloseBtn) {
  deleteCloseBtn.addEventListener("click", () => {
    closeModal(deleteModal);
    selectedCard = null;
    selectedCardId = null;
  });
}

if (deleteCancelBtn) {
  deleteCancelBtn.addEventListener("click", () => {
    closeModal(deleteModal);
    selectedCard = null;
    selectedCardId = null;
  });
}

if (deleteForm) {
  deleteForm.addEventListener("submit", handleDeleteSubmit);
}

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");

  // set content
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardId = getCardId(data);
  if (cardId) {
    cardElement.dataset.cardId = cardId;
  } else {
    console.warn("Card has no id from server:", data);
  }
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  } else {
    cardLikeBtnEl.classList.remove("card__like-btn_active");
  }

  if (cardId) cardElement.dataset.cardId = cardId;

  // Figure out who owns the card
  const ownerId = typeof data.owner === "string" ? data.owner : data.owner?._id;

  // Hide delete button if this card doesn’t belong to the logged-in user
  if (!currentUserId || !ownerId || ownerId !== currentUserId) {
    cardDeleteBtnEl.style.display = "none";
  } else {
    // Otherwise, make the delete button open the modal
    cardDeleteBtnEl.addEventListener("click", (e) => {
      e.stopPropagation();

      // Always read from dataset; fallback to data
      const id = cardElement.dataset.cardId || getCardId(data);
      if (!id) {
        console.error("No card id available for deletion:", data);
        return;
      }

      selectedCard = cardElement;
      selectedCardId = id;
      // console.log("Open delete modal for:", selectedCardId);
      openModal(deleteModal);
    });
  }

  // like button
  cardLikeBtnEl.addEventListener("click", () => {
    const isCurrentlyLiked = cardLikeBtnEl.classList.contains(
      "card__like-btn_active"
    );
    api
      .changeLikeStatus({ id: data._id, isLiked: isCurrentlyLiked })
      .then((updatedCard) => {
        console.log("Like response from server:", updatedCard);
        cardLikeBtnEl.classList.toggle(
          "card__like-btn_active",
          updatedCard.isLiked
        );
      })
      .catch((err) => {
        console.error("Failed to update like status:", err);
      });
  });

  // delete button
  cardDeleteBtnEl.addEventListener("click", (e) => {
    e.stopPropagation();
    handleDeleteCard(cardElement, data._id);
  });

  // preview click
  cardImageEl.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// ===== Avatar Modal Elements =====
const avatarBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = document.querySelector("#edit-avatar-form");
const avatarInput = document.querySelector("#profile-avatar-input");
const avatarImg = document.querySelector(".profile__avatar");
const avatarSaveBtn = avatarForm.querySelector(".modal__submit-btn");

editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent.trim();
  editProfileDescriptionInput.value = profileDescriptionEl.textContent.trim();

  const formEl = editProfileModal.querySelector(".modal__form");
  openModal(editProfileModal);

  if (!formEl) {
    console.warn("Edit Profile form not found inside modal.");
    return;
  }

  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const btnEl = formEl.querySelector(settings.submitButtonSelector);
  if (typeof resetValidation === "function") {
    resetValidation(formEl, inputList, btnEl, settings);
  } else {
    toggleButtonState(inputList, btnEl, settings);
  }
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  const formEl = addCardFormElement;
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const btnEl = formEl.querySelector(settings.submitButtonSelector);

  resetValidation(formEl, inputList, btnEl, settings);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

avatarBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModal
  .querySelector(".modal__close-btn")
  .addEventListener("click", () => closeModal(avatarModal));

avatarForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const avatarUrl = avatarInput.value.trim();
  if (!avatarUrl) return;

  const originalText = avatarSaveBtn.textContent;
  setButtonText(avatarSaveBtn, true);
  // avatarSaveBtn.textContent = "Saving...";
  avatarSaveBtn.disabled = true;

  api
    .editAvatarInfo({ avatar: avatarUrl })
    .then((data) => {
      avatarImg.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(avatarSaveBtn, false);
    });
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  setButtonText(editProfileSaveBtn, true);
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error("Profile update failed:", err);
    })
    .finally(() => {
      setButtonText(editProfileSaveBtn, false);
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  setButtonText(newPostSaveBtn, true);
  const name = nameInput.value.trim();
  const link = linkInput.value.trim();

  if (!name || !link) {
    setButtonText(newPostSaveBtn, false, "Save", "Saving...");
    return;
  }

  api
    .addCard({ name, link })
    .then((cardData) => {
      const serverCard = cardData?.data ?? cardData;
      const cardElement = getCardElement(serverCard);
      cardsList.prepend(cardElement);
      addCardFormElement.reset();
      if (typeof disableButton === "function") {
        disableButton(newPostSaveBtn, settings);
      }

      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(newPostSaveBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  console.log(avatarInput.value);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {})
    .catch(console.errror);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  if (!selectedCardId) return;
  setButtonText(deleteSubmitBtn, true, "Delete", "Deleting...");
  if (deleteCancelBtn) deleteCancelBtn.disabled = true;
  api
    .deleteCard({ id: selectedCardId })
    .then(() => {
      selectedCard.remove();
    })
    .catch((err) => {
      console.error("Delete failed:", err);
    })
    .finally(() => {
      setButtonText(deleteSubmitBtn, false, "Delete", "Deleting...");
      if (deleteCancelBtn) deleteCancelBtn.disabled = false;
      selectedCard = null;
      selectedCardId = null;
    });
}

function handleDeleteCard(cardElement, cardId) {
  if (!cardId) {
    console.warn("No _id for this card; cannot delete via API.");
    return;
  }
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);
