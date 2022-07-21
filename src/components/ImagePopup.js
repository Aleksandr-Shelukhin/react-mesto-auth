import React from 'react';

const ImagePopup = ({card, onClose, isOpen}) => {
    return (
        <div className={`popup popup_type_image ${isOpen && 'popup_opened'}`} id="galleryPopup">
            <div className="popup__image-wrapper">
                <figure className="popup__figure">
                    <picture>
                        <img className="popup__image" src={card.link} alt={card.name}/>
                    </picture>
                    <figcaption className="popup__image-caption">{card.name}</figcaption>
                </figure>
                <button type="button" onClick={onClose} className="popup__close-button transition-on-hover"
                        id="galleryPopupCloseButton"></button>
            </div>
        </div>
    );
};

export default ImagePopup;