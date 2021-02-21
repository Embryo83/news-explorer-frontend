import React from "react";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({
  articles,
  keyword,
  loggedIn,
  handleLoginClick,
  articlesArray,
  updateArticles,
}) {
  return (
    <main className="main">
       <NewsCardList
         articles={articles}
         keyword={keyword}
         loggedIn={loggedIn}
         handleLoginClick={handleLoginClick}
         articlesArray={articlesArray}
         updateArticles={updateArticles}
       />
      <About />
    </main>
  );
}

export default Main;
