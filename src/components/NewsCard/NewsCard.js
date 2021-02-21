import React, { useState, useEffect } from "react";
import "./NewsCard.css";
import { useLocation, Switch, Route } from "react-router-dom";
import { handleDate } from '../../utils/utils';

function NewsCard({
  articlesArray,
  loggedIn,
  handleLoginClick,
  updateArticles,
  ...props
}) {
  const { pathname } = useLocation();
  const [activeBookmark, setActiveBookmark] = useState(false);

  const keywordActive = `${
    pathname === "/saved-news"
      ? "card__keyword card__keyword_type_active"
      : "card__keyword"
  }`;

  useEffect(() => {
    if (loggedIn) {
      if (articlesArray) {
        setActiveBookmark(
          articlesArray.find((i) => i.title === props.title) !== undefined
        );
      }
    }
  }, [articlesArray, props.title, activeBookmark, loggedIn]);

  function handleSaveArticle(e) {
    if (localStorage.getItem("jwt")) {
      if (!activeBookmark) {
        e.target.classList.add("card__button_type_saved");
        setActiveBookmark(true);
        updateArticles(props.article, props.keyword);
        console.log(props.keyword);
      }
      if (activeBookmark) {
        setActiveBookmark(false);
        updateArticles(props.article, props.keyword);
      }
    } else {
      handleLoginClick(true);
    }
  }

  function handleDeleteArticle() {
    setActiveBookmark(false);
    updateArticles(props.article, props.keyword);
  }

  const userBookmarkButton = `${
    !loggedIn && !activeBookmark
      ? "card__button_type_not-logged"
      : `${
          loggedIn && !activeBookmark
            ? "card__button"
            : "card__button card__button_type_saved"
        }`
  }`;

  return (
    <article className="card">
      <p className={`card__keyword ${keywordActive}`}>{props.keyword}</p>
      <Switch>
        <Route exact path="/">
          <button
            className={userBookmarkButton}
            type="submit"
            onClick={
              !loggedIn
                ? handleLoginClick
                : activeBookmark
                ? handleSaveArticle
                : handleDeleteArticle
            }
          ></button>
        </Route>
        <Route path="/saved-news">
          <p className="card__keyword">{props.keyword || ""}</p>
          <button
            className="card__button card__delete-button"
            type="submit"
            onClick={handleDeleteArticle}
          ></button>
        </Route>
      </Switch>
      <img className="card__image" src={props.image} alt={props.title}></img>
      <a
        className="card__link"
        href={props.link}
        target="_blank"
        rel="noreferrer"
      >
        <p className="card__date">{handleDate(props.date)}</p>
        <h2 className="card__title">{props.title}</h2>
        <p className="card__about">{props.description}</p>
      </a>
      <a
        className="card__source-link"
        href={props.link}
        target="_blank"
        rel="noreferrer"
      >
        <p className="card__source">{props.source}</p>
      </a>
    </article>
  );
}

export default NewsCard;
