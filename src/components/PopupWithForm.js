import React from 'react';

const PopupWithForm = ({name, title, textButton, isOpen, onClick, onClose, onCloseEsc, onSubmit, ...props}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} id="profilePopup">
      <div className="popup__container popup__container_includes_form">
        <h3 className="popup__name">{title}</h3>
        <form
          className="popup__form popup__form_type_profile"
          name={name}
          onSubmit={onSubmit}
        >

          {props.children}

          <button
            type="submit"
            className="popup__form-button transition-on-hover"
          >
            {textButton}
          </button>

        </form>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button transition-on-hover"
          id="profilePopupCloseButton">
        </button>
      </div>
    </div>
  );
};

export default PopupWithForm;
