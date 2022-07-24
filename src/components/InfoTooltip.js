import React from 'react';
import checkImage from '../images/checket-infotooltip.svg';
import errorImage from '../images/error-infotooltip.svg';

const InfoTooltip = ({isRegistered, isOpen, onClose}) => {
  return (
    <div className={`popup popup_type_info ${isOpen || 'popup_opened'}`}>
      <div className="popup__container">
        <img
          src={isRegistered ? checkImage : errorImage}
          alt={isRegistered ? 'Успех' : 'Ошибка'}
          className="popup__image-info"/>
        <h3 className="popup__name popup__name_type_info">
          {
          isRegistered
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </h3>

        <button
          onClick={onClose}
          type="button"
          className="popup__close-button transition-on-hover">
        </button>
      </div>
    </div>
  );
};

export default InfoTooltip;