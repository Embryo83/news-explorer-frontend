import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Validator from "../../utils/Validator.js";

function Login({ isOpen, onClose, onSubmit, togglePopup, errorText }) {
  const validator = Validator();
  const handleChange = (e) => {
    validator.handleChange(e);
  };

  return (
    <PopupWithForm
      title="Вход"
      name="login"
      submitText="Войти"
      toggleText="Зарегистрироваться"
      togglePopup={togglePopup}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      errorText={errorText}
      isValid={validator.isValid}
    >
      <p className="popup__input-title">Email</p>
      <input
        name="email"
        className="popup__input"
        type="email"
        required
        autoComplete="off"
        placeholder="Введите почту"
        onChange={handleChange}
      />
      <span className="popup__error">{validator.errors.email}</span>

      <p className="popup__input-title">Пароль</p>
      <input
        name="password"
        className="popup__input"
        type="password"
        required
        minLength="1"
        autoComplete="off"
        placeholder="Введите пароль"
        onChange={handleChange}
      />
      <span className="popup__error ">{validator.errors.password}</span>
    </PopupWithForm>
  );
}
export default Login;
