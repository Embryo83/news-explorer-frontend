import React from "react";
import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({ articlesArray, updateArticles, loggedIn, ...props }) {
  return (
    articlesArray.length !== 0 
      ?
      (<section className="saved-news">
        <div className="saved-news__container">
          {
            articlesArray.map((article, key) => (
              <NewsCard 
                article={article}
                date={article.date}
                articles={props.articles}
                articlesArray={articlesArray}
                image={article.image}
                link={article.link}
                title={article.title}
                description={article.text}
                source={article.source.name || article.source}
                updateArticles={updateArticles}
                key={key}
                keyword={article.keyword}
                loggedIn={loggedIn}/>
          ))}
        </div>
      </section>)
      : ('')
  );
}

export default SavedNews;
