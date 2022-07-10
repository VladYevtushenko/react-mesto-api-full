import React from 'react';

function ImagePopup({ card, onClose }) {
    function closeByOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }

    return (
        <div 
            className={`popup popup_type_image ${card ? 'popup_opened' : ''}`} 
            onMouseDown={closeByOverlay}
        >
            <div className="popup__container-image">
                <button 
                    type="button" 
                    aria-label="close-button" 
                    className="popup__close-button popup__close-button_type_image" 
                    onClick={onClose}
                    ></button>
                <img 
                    className="popup__big-image" 
                    src={card?.link} 
                    alt={card?.name} 
                />
                <h2 className="popup__image-title">{card?.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;