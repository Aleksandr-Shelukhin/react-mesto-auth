import React, {useContext} from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) => {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <div className="container">
        <section className="profile">
          <div
            onClick={onEditAvatar}
            className="profile__avatar-wrapper">
            <div className="profile__avatar-edit-icon"></div>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватарка пользователя"/>
          </div>
          <div className="profile__info-wrapper">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              onClick={onEditProfile}
              className="profile__edit-button transition-on-hover"
              type="button">
            </button>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__add-button transition-on-hover"
            type="button">
          </button>
        </section>

        <section className="elements">
          <ul className="elements__list">
            {
              cards.map((cardItem) => (
                <Card
                  card={cardItem}
                  key={cardItem._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              ))
            }

          </ul>
        </section>
      </div>
    </main>
  );
};

export default Main;