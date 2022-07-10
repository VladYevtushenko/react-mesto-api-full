import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onCardDelete, buttonText = 'Да' }) {
    function handleSubmit(evt) {
        evt.preventDefault();

        onCardDelete();
    }

    return (
        <PopupWithForm 
            name='del-confirm' 
            title='Вы уверены?' 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit}
            buttonText={buttonText}
        >
        </PopupWithForm>
    );
}

export default ConfirmPopup;