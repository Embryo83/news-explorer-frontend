import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ handleSearch }) {
  const [keyword, setKeyword] = useState('');

  function handleSetKeyword (evt) {
    setKeyword(evt.target.value);
  }

  function searchSubmit (evt) {
    evt.preventDefault();
    if (handleSearch) {
      handleSearch(keyword);
    }
  }

  return (
    <div className="search">
      <form onSubmit={searchSubmit} className="search__container">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__info">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном
          кабинете.
        </p>
        <div className="search__block">
          <input
            className="search__input"
            placeholder="Введите тему новости"
            onChange={handleSetKeyword}
            required
          ></input>
          <button className="search__button">Искать</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
