import React from "react";
import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import Cards from "../../utils/SampleCards";

function SavedNews() {
  return (
    <section className="saved-news">
      <div className="saved-news__container">
        {Cards.map((article, key) => (
          <NewsCard article={article} key={key} />
        ))}
      </div>
    </section>
  );
}

export default SavedNews;
