import React from "react";
import "./Header.css";
import { useLocation, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logout from "../../images/logout-dark.png";

function Header(props) {
  const { pathname } = useLocation();
  const blackLogo = `${
    pathname === "/saved-news" ? "header__logo_type_dark" : "header__logo"
  }`;
  const blackBurger = `${
    pathname === "/saved-news" ? "header__burger_type_dark" : "header__burger"
  }`;
  const blackButton = `${
    pathname === "/saved-news"
      ? "header__active-button_type_dark"
      : "header__button_type_dark"
  }`;
  const whiteButton = `${
    pathname === "/saved-news" ? "header__active-button" : "header__button"
  }`;
  return (
    <header className="header">
      <Link to="/" className={`header__logo ${blackLogo}`}>
        NewsExplorer
      </Link>
      <button
        type="button"
        onClick={props.handleMenuClick}
        className={`header__burger ${blackBurger}`}
      ></button>
      <div className="header__container">
        <Navigation></Navigation>

        <button
          type="button"
          onClick={props.handleLoginClick}
          className={`header__button ${whiteButton}`}
        >
          Авторизоваться
        </button>
        <Link className="header__name-button" to="/">
          <button
            type="button"
            className={`header__button_type_dark ${blackButton}`}
          >
            Грета
            <img className="header__logout" src={logout} alt="Выход" />
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
