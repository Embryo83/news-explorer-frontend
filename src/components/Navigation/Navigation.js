import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ loggedIn }) {
  const { pathname } = useLocation();
  const blackNav = `${
    pathname === "/saved-news" ? "nav__link_type_dark" : "nav__link"
  }`;
  return (
    <nav className="nav">
      <ul className="nav__container">
      { !loggedIn ? (
        <li className="nav__title">
          <NavLink
            exact
            to="/"
            activeClassName="nav__active-link"
            className={`nav__link ${blackNav}`}
          >
            Главная
          </NavLink>
        </li>
      ) : (       
        <> 
        <li className="nav__title">
          <NavLink
            exact
            to="/"
            activeClassName="nav__active-link"
            className={`nav__link ${blackNav}`}
          >
            Главная
          </NavLink>
        </li>
        <li className="nav__title">
          <NavLink
            to="/saved-news"
            activeClassName="nav__active-link_type_dark"
            className={`${loggedIn ? `nav__link ${blackNav}` : 'nav__link_hidden'}`}
          >
            Сохраненные статьи
          </NavLink>
        </li>
        </>
      )}
      </ul>
    </nav>
  );
}

export default Navigation;
