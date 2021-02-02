import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Main from "../Main/Main";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedNews from "../SavedNews/SavedNews";
import PopupRegister from "../PopupRegister/PopupRegister";
import PopupLogin from "../PopupLogin/PopupLogin";
import PopupConfirm from "../PopupConfirm/PopupConfirm";
import PopupMenu from "../PopupMenu/PopupMenu";
import Footer from "../Footer/Footer";

function App() {
  const [isOpenPopupRegister, setIsOpenPopupRegister] = useState(false);
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
  const [isOpenPopupMenu, setIsOpenPopupMenu] = useState(false);
  const [isOpenPopupConfirm, setIsOpenPopupConfirm] = useState(false);
  const errorText = "Здесь будет надпись ошибки сервера";

  function handleRegisterClick() {
    setIsOpenPopupRegister(true);
    setIsOpenPopupConfirm(true);
  }

  function handleLoginClick() {
    setIsOpenPopupLogin(true);
    setIsOpenPopupMenu(false);
  }

  function submitRegister(e) {
    e.preventDefault();
    setIsOpenPopupRegister(false);
    setIsOpenPopupConfirm(true);
  }

  function handleMenuClick() {
    setIsOpenPopupMenu(true);
  }

  function closeAllPopups(e) {
    if (isOpenPopupMenu) {
      setIsOpenPopupMenu(false);
    }
    if (isOpenPopupLogin) {
      setIsOpenPopupLogin(false);
    }
    if (isOpenPopupRegister) {
      setIsOpenPopupRegister(false);
    }
    if (setIsOpenPopupConfirm) {
      setIsOpenPopupConfirm(false);
    }
  }

  function togglePopup() {
    if (isOpenPopupLogin) {
      handleRegisterClick();
      closeAllPopups();
    } else if (isOpenPopupRegister) {
      handleLoginClick();
      closeAllPopups();
    }
  }

  function toggleToLogin() {
    closeAllPopups();
    setIsOpenPopupLogin(true);
  }

  React.useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeOverlay(event) {
      if (event.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }

    document.addEventListener("click", closeOverlay);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", closeOverlay);
    };
  });
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div className="bg">
            <Header
              isOpen={isOpenPopupMenu}
              onClose={closeAllPopups}
              handleMenuClick={handleMenuClick}
              handleLoginClick={handleLoginClick}
            ></Header>
            <SearchForm></SearchForm>
          </div>
          <Main />
        </Route>
        <Route path="/saved-news">
          <Header
            isOpen={isOpenPopupMenu}
            onClose={closeAllPopups}
            handleMenuClick={handleMenuClick}
            handleLoginClick={handleLoginClick}
          ></Header>
          <SavedNewsHeader></SavedNewsHeader>
          <SavedNews></SavedNews>
        </Route>
      </Switch>
      <Footer></Footer>
      <section className="popups">
        <PopupRegister
          isOpen={isOpenPopupRegister}
          onClose={closeAllPopups}
          togglePopup={togglePopup}
          onSubmit={submitRegister}
          errorText={errorText}
        ></PopupRegister>
        <PopupLogin
          isOpen={isOpenPopupLogin}
          onClose={closeAllPopups}
          togglePopup={togglePopup}
        ></PopupLogin>
        <PopupMenu
          isOpen={isOpenPopupMenu}
          handleMenuClick={handleMenuClick}
          onClose={closeAllPopups}
          onClick={handleLoginClick}
        ></PopupMenu>
        <PopupConfirm
          isOpen={isOpenPopupConfirm}
          onClose={closeAllPopups}
          onToggle={toggleToLogin}
        ></PopupConfirm>
      </section>
    </div>
  );
}

export default App;
