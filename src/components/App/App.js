import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsNotFoud from "../NewsNotFound/NewsNotFound";
import Main from "../Main/Main";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedNews from "../SavedNews/SavedNews";
import PopupRegister from "../PopupRegister/PopupRegister";
import PopupLogin from "../PopupLogin/PopupLogin";
import PopupConfirm from "../PopupConfirm/PopupConfirm";
import PopupMenu from "../PopupMenu/PopupMenu";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as api from "../../utils/MainApi";
import searchNewsApi from "../../utils/NewsApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [articlesArray, setArticlesArray] = useState([]);
  const [articlesLength, setArticlesLength] = useState(0);
  const [isOpenNotFound, setIsOpenNotFound] = useState(false);
  const [isOpenPreloader, setIsOpenPreloader] = useState(false);
  const [isOpenPopupRegister, setIsOpenPopupRegister] = useState(false);
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
  const [isOpenPopupMenu, setIsOpenPopupMenu] = useState(false);
  const [isOpenPopupConfirm, setIsOpenPopupConfirm] = useState(false);
  const [isErrorText, setIsErrorText] = useState("");

  function getToken() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    if (jwt) {
      setLoggedIn(true);
      history.push("/");
      getSavedArticles();
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(JSON.parse(localStorage.getItem("user")));
            setArticles(JSON.parse(localStorage.getItem("articles")));
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function registerUser(password, email, name) {
    api
      .register(password, email, name)
      .then((res) => {
        if (res) {
          closeAllPopups();
          setIsOpenPopupConfirm(true);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsErrorText(err);
        console.log(err);
      });
  }

  function loginUser(password, email) {
    api
      .login(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        if (res) {
          api
            .getContent(res.token)
            .then((data) => {
              localStorage.setItem("user", JSON.stringify(data));
              setCurrentUser(data);
              setLoggedIn(true);
              closeAllPopups();
              history.push("/");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        setIsErrorText(err);
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setArticles([]);
    setLoggedIn(false);
    history.push("/");
  }

  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));
  }, [keyword]);

  function getSavedArticles() {
    api
      .getArticles()
      .then((res) => {
        if (res) {
          setArticlesArray(res);
          setArticlesLength(res.length);
          setKeyword(res.keyword);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function saveArticle(article, keyword) {
    if (loggedIn) {
      api
        .saveArticle(article, keyword)
        .then((data) => {
          if (data) {
            getSavedArticles();
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  function deleteArticlesArray(article) {
    api
      .deleteArticle(article)
      .then(() => {
        const myArticle = articlesArray.filter((i) => i._id !== article._id);
        setArticlesArray(myArticle);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function updateArticles(article, keyword, savedArticles) {
    const savedArticle = articlesArray.find((i) => {
      if (savedArticles) {
        return i.title === savedArticles.title && i._id === savedArticles._id;
      }
      if (article) {
        return i.title === article.title && i._text === article._description;
      }
      return null;
    });

    if (savedArticle) {
      deleteArticlesArray(savedArticle);
    } else {
      saveArticle(article, keyword);
    }
  }

  function handleSearch(keyword) {
    setIsOpenPreloader(true);
    setIsOpenNotFound(false);
    localStorage.removeItem("articles");
    localStorage.removeItem("keyword");
    searchNewsApi(keyword)
      .then((data) => {
        localStorage.setItem("articles", JSON.stringify(data.articles));
        localStorage.setItem("keyword", keyword);
        setArticles(data.articles);
        setKeyword(keyword);
        if (data.articles.length === 0) {
          setIsOpenNotFound(true);
        }
      })
      .catch((err) => {
        console.log(err.status);
        setIsOpenNotFound(true);
      })
      .finally(() => setIsOpenPreloader(false));
  }

  function handleRegisterClick() {
    setIsOpenPopupRegister(true);
    setIsOpenPopupConfirm(true);
    setIsErrorText("");
  }

  function handleLoginClick() {
    setIsOpenPopupLogin(true);
    setIsOpenPopupMenu(false);
    setIsErrorText("");
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

  useEffect(() => {
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
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <div className="bg">
              <Header
                loggedIn={loggedIn}
                isOpen={isOpenPopupMenu}
                onClose={closeAllPopups}
                handleMenuClick={handleMenuClick}
                handleLoginClick={handleLoginClick}
                handleRegisterClick={handleRegisterClick}
                signOut={signOut}
              ></Header>
              <SearchForm handleSearch={handleSearch}></SearchForm>
            </div>
            <Preloader isOpen={isOpenPreloader}></Preloader>
            <NewsNotFoud isOpen={isOpenNotFound}></NewsNotFoud>
            <Main
              loggedIn={loggedIn}
              articles={articles}
              articlesArray={articlesArray}
              saveArticle={saveArticle}
              updateArticles={updateArticles}
              keyword={keyword}
              handleRegisterClick={handleRegisterClick}
              setIsOpenPopupRegister={setIsOpenPopupRegister}
              handleLoginClick={handleLoginClick}
            ></Main>
          </Route>
          <ProtectedRoute path="/saved-news" loggedIn={loggedIn}>
            <Header
              loggedIn={loggedIn}
              isOpen={isOpenPopupMenu}
              onClose={closeAllPopups}
              handleMenuClick={handleMenuClick}
              handleLoginClick={handleLoginClick}
              signOut={signOut}
            ></Header>
            <SavedNewsHeader
              articlesArray={articlesArray}
              articlesLength={articlesLength}
            ></SavedNewsHeader>
            <SavedNews
              path="/saved-news"
              loggedIn={loggedIn}
              signOut={signOut}
              handleMenuClick={handleMenuClick}
              articlesArray={articlesArray}
              updateArticles={updateArticles}
              keyword={keyword}
            ></SavedNews>
          </ProtectedRoute>
        </Switch>
        <Footer></Footer>
        <section className="popups">
          <PopupRegister
            isOpen={isOpenPopupRegister}
            onClose={closeAllPopups}
            togglePopup={togglePopup}
            onSubmit={registerUser}
            isErrorText={isErrorText}
          ></PopupRegister>
          <PopupLogin
            onSubmit={loginUser}
            isOpen={isOpenPopupLogin}
            onClose={closeAllPopups}
            togglePopup={togglePopup}
            isErrorText={isErrorText}
          ></PopupLogin>
          <PopupMenu
            loggedIn={loggedIn}
            isOpen={isOpenPopupMenu}
            handleMenuClick={handleMenuClick}
            onClose={closeAllPopups}
            onClick={handleLoginClick}
            signOut={signOut}
          ></PopupMenu>
          <PopupConfirm
            isOpen={isOpenPopupConfirm}
            onClose={closeAllPopups}
            onToggle={toggleToLogin}
          ></PopupConfirm>
        </section>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
