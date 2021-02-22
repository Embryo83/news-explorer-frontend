import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Validator from "../../utils/Validator.js";

function Login({ isOpen, onClose, onSubmit, togglePopup, isErrorText }) {
  const { values, handleChange, errors, isValid, resetForm } = Validator();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function submitLogin(e) {
    e.preventDefault();
    onSubmit(values.password, values.email);
  }

  return (
    <PopupWithForm
      title="Вход"
      name="login"
      submitText="Войти"
      toggleText="Зарегистрироваться"
      togglePopup={togglePopup}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitLogin}
      errorMessage={isErrorText}
      isValid={isValid}
    >
      <p className="popup__input-title">Email</p>
      <input
        value={values.email || ""}
        name="email"
        className="popup__input"
        type="email"
        required
        autoComplete="off"
        placeholder="Введите почту"
        onChange={handleChange}
      />
      <span className="popup__error">{errors.email}</span>

      <p className="popup__input-title">Пароль</p>
      <input
        value={values.password || ""}
        name="password"
        className="popup__input"
        type="password"
        required
        minLength="2"
        autoComplete="off"
        placeholder="Введите пароль"
        onChange={handleChange}
      />
      <span className="popup__error ">{errors.password}</span>
    </PopupWithForm>
  );
}
export default Login;
