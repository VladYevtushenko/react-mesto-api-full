import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Validation from '../../utils/Validation';

function EditAvatarPopup({ 
    isOpen, 
    onClose, 
    onEditAvatar,
    loggedIn,
    isValid,
    errorMessage,
    buttonText
}) {
    const [avatar, setAvatar] = useState('');

    function handleAvatar(e) {
        setAvatar(e.target.value);
    }
    
    function handleFocus(e) {
        e.target.select();
    }

    useEffect(() => {
        setAvatar('');
    }, [loggedIn]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onEditAvatar({ avatar });
        setAvatar('');
    }

    return (
        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар" 
            isOpen={isOpen} 
            onClose={onClose}
            isValid={isValid}
            onSubmit={handleSubmit}
            buttonText={buttonText}
        >
            <input 
                type="url" 
                className="popup__input" 
                placeholder="Ссылка на картинку" 
                name="avatarLink" 
                value={avatar}
                onChange={handleAvatar}
                onFocus={handleFocus}
                required 
            />
            <Validation errorMessage={errorMessage} name="avatarLink" />
		</PopupWithForm>
    )
}

export default EditAvatarPopup;