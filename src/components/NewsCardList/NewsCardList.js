import React from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import Cards from "../../utils/SampleCards";

function NewsCardList() {
  const [onClick, setOnClick] = React.useState(false);

  const handleClick = () => {
    setOnClick(true);
  };

  return (
    <section className="cards">
      <h2 className="cards__title">Результаты поиска</h2>
      <div className="cards__container">
        {!onClick
          ? Cards.slice(0, 3).map((article, key) => (
              <NewsCard article={article} key={key} />
            ))
          : Cards.map((article, key) => (
              <NewsCard article={article} key={key} />
            ))}
      </div>
      <button onClick={handleClick} className="cards__button">
        Показать еще
      </button>
    </section>
  );
}

export default NewsCardList;
