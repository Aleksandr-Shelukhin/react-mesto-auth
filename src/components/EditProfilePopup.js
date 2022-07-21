import React, {useState, useEffect, useContext} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext)

 function handleChangeName(evt) {
    setName(evt.target.value);
 }
 function handleChangeDescription(evt) {
    setDescription(evt.target.value);
 }

 function handleSubmit(evt) {
   evt.preventDefault();

   props.onUpdateUser({
     name,
     about: description,
   });
 }

 useEffect(() => {
   setName(currentUser.name);
   setDescription(currentUser.about);
 }, [currentUser, props.isOpen]
 );

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      textButton={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field" htmlFor="name-input">
        <input
          id="name-input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          className="popup__form-input"
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="name-input-error popup__form-input-error"></span>
      </label>

      <label className="popup__form-field" htmlFor="job-input">
        <input
          id="job-input"
          type="text"
          name="job"
          placeholder="Род деятельности"
          minLength="2"
          maxLength="200"
          required
          className="popup__form-input"
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="job-input-error popup__form-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;