import React, {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
    });
  }

  function handleCardName(evt) {
    setName(evt.target.value);
  }

  function handleCardLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'cards'}
      textButton={'Добавить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field" htmlFor="place-input">
        <input
          id="place-input"
          type="text"
          name="place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          className="popup__form-input"
          onChange={handleCardName}
          value={name}
        />
        <span className="place-input-error popup__form-input-error"></span>
      </label>

      <label className="popup__form-field" htmlFor="link-input">
        <input
          id="link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          className="popup__form-input"
          onChange={handleCardLink}
          value={link}
        />
        <span className="link-input-error popup__form-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;