import React, {useState, useEffect} from 'react';
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import { register, signin, getContent} from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const [isRegistered, setIsRegistered] = useState(false)
  const [userEmail, setUserEmail] = useState(false)
  const history = useHistory()


  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if(loggedIn) {
      api.renderCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  useEffect(() => {
    if(loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  const handleSignUpSubmit = ({ email, password }) => {
    return register(password, email)
      .then (() => {
        setIsRegistered(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err)
      });
  };



  const handleSignInSubmit = ({ email, password }) => {
    return signin(password, email)
      .then ((data) => {
        if (data) {
          getContent(data.token)
            .then((res) => {
              setUserEmail(res.data.email);
              setLoggedIn(true);
              history.push('/');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setIsRegistered(false);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => !(c._id === card._id)));
      })
      .catch((err) => {
        console.log(err);
      })
  }


  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteConfirmPopupOpen() {
    setIsDeleteConfirmPopupOpen(true);
  }

  function handleCardClick(cardItem) {
    setSelectedCard(cardItem);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false)
    setSelectedCard({});
  }

  function handleUpdateUser(newInfo) {
    api.addUserInfo(newInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(newAvatar) {
    api.replaceAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  function handleAddPlaceSubmit(newCardInfo) {
    api.addNewCard(newCardInfo)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={userEmail}
          signOut={handleSignOut}
        />
        <Switch>

          <ProtectedRoute
            exact path='/'
            component={Main}
            onEditProfile={handleEditProfilePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onConfirmDelete={handleDeleteConfirmPopupOpen}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
          />
          <Route path='/sign-up'>
            <Register
              onRegister={handleSignUpSubmit}
            />
          </Route>

          <Route path='/sign-in'>
            <Login
              onLogin={handleSignInSubmit}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/'/> : <Redirect to='sign-up'/>}
          </Route>
        </Switch>
        <Footer/>

        {/*Попап редактирования профиля*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/*Попап добавление нового места*/}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/*Попап обновления аватара*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/*Попап подтверждения удаления*/}
        <PopupWithForm
          title={'Вы уверены?'}
          name={'confirm'}
          textButton={'Да'}
          isOpen={isDeleteConfirmPopupOpen}
          onClose={closeAllPopups}>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <InfoTooltip
          isRegistered={isRegistered}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
