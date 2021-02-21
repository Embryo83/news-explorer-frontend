import React, { useEffect, useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { CARDS_TO_SHOW } from "../../utils/constants";

function NewsCardList({
  articles,
  keyword,
  loggedIn,
  handleLoginClick,
  updateArticles,
  articlesArray,
}) {
  const [articlesResult, setArticlesResult] = useState([]);
  const [isButtonHidden, setIsButtonHidden] = useState(true);

  useEffect(() => {
    setArticlesResult(articles.slice(0, CARDS_TO_SHOW));
    if (articles.length <= CARDS_TO_SHOW) {
      return setIsButtonHidden(false);
    }
    return setIsButtonHidden(true);
  }, [articles]);

  function openMoreArticles() {
    setArticlesResult(articles.slice(0, articlesResult.length + CARDS_TO_SHOW));
    if (articlesResult.length >= articles.length - CARDS_TO_SHOW) {
      setIsButtonHidden(false);
    }
  }

  return (
    <section
      className={articlesResult.length > 0 ? "cards" : "cards_not-active"}
    >
      <h2 className="cards__title">Результаты поиска</h2>
      <div className="cards__container">
        {articlesResult.map((article, key) => (
          <NewsCard
            article={article}
            key={key}
            keyword={keyword}
            title={article.title}
            date={article.publishedAt}
            image={article.urlToImage}
            link={article.url}
            description={article.description}
            source={article.source.name}
            loggedIn={loggedIn}
            handleLoginClick={handleLoginClick}
            articlesArray={articlesArray}
            updateArticles={updateArticles}
          />
        ))}
      </div>
      {articles.length > 3 && (
        <button
          onClick={openMoreArticles}
          className={
            isButtonHidden ? "cards__button" : "cards__button_not-active"
          }
        >
          Показать еще
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
