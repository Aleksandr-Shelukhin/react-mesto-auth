import React, {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = (props) => {

  const currentUser = useContext(CurrentUserContext);

  //Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__button_type_trash ${isOwn ? 'element__button_visible' : 'element__button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__button_type_heart ${isLiked ? 'element__button_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (

    <li className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="element__footer">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-wrapper">
          <button
            onClick={handleLikeClick}
            className={`element__button ${cardLikeButtonClassName} transition-on-hover`}
            type="button"></button>
          <span className="element__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className={`element__button ${cardDeleteButtonClassName} transition-on-hover`}
        type="button"></button>
    </li>

  );
};

export default Card;