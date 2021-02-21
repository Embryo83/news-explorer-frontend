import React, { useContext } from "react";
import "./SavedNewsHeader.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ articlesArray }) {
  const currentUser = useContext(CurrentUserContext);
  const keywordsArray = articlesArray.map((item) => item.keyword);
  const keywords = [...new Set(keywordsArray)];

  function handleNewsQuantity(items) {
    if (items === 1) {
      return "сохраннённая статья";
    } else if (items > 1 && items < 5) {
      return "сохранённые статьи";
    } else if (items === 0 || items >= 5) {
      return "сохранённых статей";
    }
  }

  function handleKeywordsText(items) {
    if (items < 2) {
      return "По ключевому слову: ";
    } else if (items >= 2) {
      return "По ключевым словам: ";
    }
  }

  function handleText(items) {
    if (items < 4) {
      return "";
    } else if (items >= 4 && items < 7) {
      return "-м другим";
    } else if (items >= 7) {
      return "-и другим";
    }
  }

  function toUpperCase(string) {
    if (!string) {
      return string;
    }
    return string[0].toUpperCase() + string.slice(1);
  }

  const firstKeyword = `${toUpperCase(keywordsArray[0])}`;
  const secondKeyword = `${toUpperCase(keywordsArray[1])}`;
  const thirdKeyword = `${toUpperCase(keywordsArray[2])}`;

  const moreKeywords = `${
    keywords.length === 3
      ? ` ${firstKeyword}, ${secondKeyword}, ${thirdKeyword}`
      : ` ${firstKeyword}, ${secondKeyword}`
  }`;

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__subtitle">Сохраненные статьи</p>
        <h3 className="saved-news-header__title">
          {currentUser.name}, у вас {articlesArray.length}{" "}
          {handleNewsQuantity(articlesArray.length)}
        </h3>
        {keywords.length === 0 ? (
          ""
        ) : (
          <p className="saved-news-header__keywords">
            {handleKeywordsText(keywords.length)}{" "}
            <b>
              {keywords.length < 2 ? `${firstKeyword}` : `${moreKeywords}`}
              {keywords.length - 2 > 1
                ? ` и  ${keywords.length - 2}${handleText(keywords.length)}`
                : ""}
            </b>
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
