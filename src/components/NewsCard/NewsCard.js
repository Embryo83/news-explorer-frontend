import React from "react";
import "./NewsCard.css";
import { useLocation } from "react-router-dom";

function NewsCard(props) {
  const { pathname } = useLocation();
  const keywordActive = `${
    pathname === "/saved-news" ? "card__keyword_type_active" : "card__keyword"
  }`;
  const deleteButton = `${
    pathname === "/saved-news" ? "card__delete-button" : "card__button"
  }`;
  return (
    <article className="card">
      <p className={`card__keyword ${keywordActive}`}>
        {props.article.keyword}
      </p>
      <button className={`card__button ${deleteButton}`}></button>
      <img
        className="card__image"
        src={props.article.image}
        alt="Изображение"
      ></img>
      <a
        className="card__link"
        href={props.article.link}
        target="_blank"
        rel="noreferrer"
      >
        <p className="card__date">{props.article.date}</p>
        <h2 className="card__title">{props.article.title}</h2>
        <p className="card__about">{props.article.text}</p>
      </a>
      <a
        className="card__source-link"
        href={props.article.link}
        target="_blank"
        rel="noreferrer"
      >
        <p className="card__source">{props.article.source}</p>
      </a>
    </article>
  );
}

export default NewsCard;
