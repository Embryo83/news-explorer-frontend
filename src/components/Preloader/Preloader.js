import React from "react";
import "./Preloader.css";

function Preloader({ isOpen }) {
  return (
    <section className={`preloader ${isOpen ? 'preloader_active' : ''}`}>
      <i className="preloader__circle"></i>
      <p className="preloader__text">Идет поиск новостей...</p>
    </section>
  );
}

export default Preloader;
