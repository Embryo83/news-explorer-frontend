import React from "react";
import "./PopupMenu.css";
import { useLocation, Link, NavLink } from "react-router-dom";
import logoutLight from "../../images/logout-dark.png";

function PopupMenu({ isOpen, onClose, onClick }) {
  const { pathname } = useLocation();

  const savedNewsButton = `${
    pathname === "/saved-news"
      ? "burger__dark-button_type_active"
      : "burger__dark-button"
  }`;
  const whiteButton = `${
    pathname === "/saved-news" ? "burger__button_type_active" : ""
  }`;
  const darkButton = `${
    pathname === "/saved-news" ? "burger__light-button" : ""
  }`;
  const whiteBg = `${
    pathname === "/saved-news" ? "burger__container_type_white" : ""
  }`;
  const darkText = `${
    pathname === "/saved-news" ? "burger__text_type_dark" : ""
  }`;
  const menuCloseButton = `${
    pathname === "/saved-news"
      ? "burger__close-button_type_light"
      : "burger__close-button"
  }`;
  return (
    <div className={`burger ${isOpen && "burger_type_opened"}`}>
      <div className={`burger__container ${whiteBg}`}>
        <div className="burger__header">
          <Link to="/" className={`burger__logo ${darkText}`}>
            NewsExplorer
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={`${menuCloseButton}`}
          ></button>
        </div>
        <div className="burger__menu">
          <nav className="burger__nav">
            <ul className="burger__nav-list">
              <li className="burger__nav-link">
                <NavLink
                  className={`burger__nav-title ${darkText}`}
                  exact
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
              <li className="burger__nav-link">
                <NavLink
                  className={`burger__nav-title ${darkText}`}
                  to="/saved-news"
                >
                  Сохраненные статьи
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="burger__button-container">
            <button
              type="button"
              onClick={onClick}
              className={`burger__button ${whiteButton}`}
            >
              Авторизоваться
            </button>
            <Link className="burger__button-link" to="/">
              <div
                className={`burger__button-name ${savedNewsButton} ${darkButton}`}
              >
                Грета
                <img className="burger__logout" src={logoutLight} alt="Выход" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupMenu;
