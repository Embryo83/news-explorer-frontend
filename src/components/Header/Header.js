import React from "react";
import "./Header.css";
import { useLocation, Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Navigation from "../Navigation/Navigation";
import logout from "../../images/logout-dark.png";
import logoutDark from "../../images/logout.png";

function Header({
  handleMenuClick,
  handleLoginClick,
  loggedIn,
  signOut,
}) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
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
  const buttonTitle = `${!loggedIn ? `Авторизоваться` : `${currentUser.name}`}`;

  return (
    <header className="header">
      <Link to="/" className={`header__logo ${blackLogo}`}>
        NewsExplorer
      </Link>
      <button
        type="button"
        onClick={handleMenuClick}
        className={`header__burger ${blackBurger}`}
      ></button>
      <div className="header__container">
        <Navigation loggedIn={loggedIn}></Navigation>

        <button
          type="button"
          onClick={loggedIn ? signOut : handleLoginClick}
          className={`header__button ${whiteButton}`}
        >
          {buttonTitle}
          {loggedIn && (
            <img className="header__logout" src={logoutDark} alt="Выход" />
          )}
        </button>
        <button
          onClick={signOut}
          className={`header__button_type_dark ${blackButton}`}
        >
          {buttonTitle}
          <img className="header__logout" src={logout} alt="Выход" />
        </button>
      </div>
    </header>
  );
}

export default Header;
