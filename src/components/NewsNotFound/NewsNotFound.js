import React from "react";
import "./NewsNotFound.css";
import notFound from "../../images/nonews-pic.png";

function NewsNotFound({ isOpen }) {
  return (
    <section className={`no-result ${isOpen ? 'no-result_active' : ''}`}>
      <div className="no-result__container">
        <img
          className="no-result__logo"
          alt="Ничего не найдено"
          src={notFound}
        />
        <h2 className="no-result__title">Ничего не найдено</h2>
        <p className="no-result__subtitle">
          К сожалению по вашему запросу ничего не найдено.
        </p>
      </div>
    </section>
  );
}

export default NewsNotFound;
