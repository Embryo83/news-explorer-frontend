import React from "react";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import NewsNotFound from "../NewsNotFound/NewsNotFound";
import Preloader from "../Preloader/Preloader";

function Main() {
  return (
    <main className="main">
      <Preloader />
      <NewsNotFound />
      <NewsCardList />
      <About />
    </main>
  );
}

export default Main;
