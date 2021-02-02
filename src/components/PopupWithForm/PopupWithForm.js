import React from "react";
import "./PopupWithForm.css";

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  name,
  submitText,
  toggleText,
  togglePopup,
  errorText,
  isValid,
  children,
}) {
  const form = `popup ${isOpen && "popup_type_opened"}`;
  const submitButton = `popup__submit-button ${
    isValid && "popup__submit-button_type_active"
  }`;

  return (
    <div className={form}>
      <div className="popup__overlay" onClick={onClose}></div>
      <form
        name={name}
        onSubmit={onSubmit}
        className="popup__container"
        noValidate
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <p className="popup__error popup__error_type_server">{errorText}</p>
        <button type="submit" className={submitButton}>
          {submitText}
        </button>
        <p className="popup__toggle">
          или{" "}
          <button
            type="reset"
            className="popup__toggle-button"
            onClick={togglePopup}
          >
            {toggleText}
          </button>
        </p>
        <button
          type="reset"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}
export default PopupWithForm;
