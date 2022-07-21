import React, {useRef, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const inputAvatarRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    });
  }

  useEffect(() => {
    inputAvatarRef.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      textButton={'Обновить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field" htmlFor="avatar-link-input">
        <input
          id="avatar-link-input"
          type="url"
          name="avatar-link"
          placeholder="Ссылка на аватар"
          required
          className="popup__form-input"
          ref={inputAvatarRef}
        />
        <span className="avatar-link-input-error popup__form-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;