import React from "react";
import "./PopupConfirm.css";

function PopupConfirm({ isOpen, onClose, onToggle }) {
  return (
    <div className={`popup ${isOpen ? "popup_type_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
        ></button>
        <h3 className="popup__title-info">
          Пользователь успешно зарегистрирован!
        </h3>
        <button
          onClick={onToggle}
          type="button"
          className="popup__button-login"
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default PopupConfirm;
