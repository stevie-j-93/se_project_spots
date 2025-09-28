export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error__visible",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgId = `#${inputEl.id}-error`;
  const errorMsgEl = formEl.querySelector(errorMsgId);
  inputEl.classList.add(config.inputErrorClass);
  if (!errorMsgEl) return;
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgId = `#${inputEl.id}-error`;
  const errorMsgEl = formEl.querySelector(errorMsgId);
  if (!errorMsgEl) return;

  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);

  if (config.errorClass) {
    errorMsgEl.classList.remove(config.errorClass);
  }
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const disableButton = (buttonEl, config) => {
  if (!buttonEl) return;
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};

const enableButton = (buttonEl, config) => {
  if (!buttonEl) return;
  buttonEl.disabled = false;
  buttonEl.classList.remove(config.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    enableButton(buttonEl, config);
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

export function resetValidation(formEl, inputList, btnEl, config) {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });

  toggleButtonState(inputList, btnEl, config);
}

enableValidation(settings);
