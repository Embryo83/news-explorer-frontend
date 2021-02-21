import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Validator from "../../utils/Validator.js";

function Register({ isOpen, onClose, onSubmit, togglePopup, isErrorText }) {
  const { values, handleChange, errors, isValid, resetForm } = Validator();

  function submitRegister(evt) {
    evt.preventDefault();
    onSubmit(values.password, values.email, values.name);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Регистрация"
      name="register"
      submitText="Зарегистрироваться"
      toggleText="Войти"
      togglePopup={togglePopup}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitRegister}
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

      <p className="popup__input-title">Имя</p>
      <input
        value={values.name || ""}
        name="name"
        className="popup__input"
        type="text"
        minLength="3"
        required
        autoComplete="off"
        placeholder="Введите имя"
        onChange={handleChange}
      />
      <span className="popup__error ">{errors.name}</span>
    </PopupWithForm>
  );
}
export default Register;
