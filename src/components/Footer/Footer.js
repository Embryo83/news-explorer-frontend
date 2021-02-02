import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import github from "../../images/gh-icon.png";
import facebook from "../../images/fb-icon.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2020 Supersite, Powered by News API
      </p>
      <div className="footer__container">
        <ul className="footer__links">
          <li className="footer__link">
            <Link className="footer__link-text" to="/">
              Главная
            </Link>
          </li>
          <li className="footer__link">
            <a
              className="footer__link-text"
              href="https://praktikum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
        </ul>
        <ul className="footer__icons">
          <li className="footer__icon">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <img className="footer__icon-img" src={github} alt="GitHub"></img>
            </a>
          </li>
          <li className="footer__icon">
            <a href="https://facebook.com/" target="_blank" rel="noreferrer">
              <img
                className="footer__icon-img"
                src={facebook}
                alt="Facebook"
              ></img>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
