import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import Validation from '../../utils/Validation';

function EditProfilePopup ({ 
    isOpen, 
    onClose, 
    onEditUser,
    buttonText,
    isValid,
    errorMessage
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleName(e) {
        setName(e.target.value);
    }
    
    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleFocus(e) {
        e.target.select();
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        
        onEditUser({ 
            name, 
            about: description,
        });
    }

    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            isOpen={isOpen} 
            onClose={onClose}
            isValid={isValid}
            onSubmit={handleSubmit}
            buttonText={buttonText}
        >
                <input 
                    type="text"  
                    className="popup__input" 
                    placeholder="Имя" 
                    name="userName" 
                    minLength="2" 
                    maxLength="40" 
                    value={name || ''} 
                    onChange={handleName}
                    onFocus={handleFocus}
                    required 
                />
                <Validation errorMessage={errorMessage} name="userName" />

                <input 
                    type="text" 
                    className="popup__input" 
                    placeholder="О себе" 
                    name="aboutMe" 
                    minLength="2" 
                    maxLength="200" 
                    value={description || ''} 
                    onChange={handleDescription}
                    onFocus={handleFocus}
                    required 
                />
                <Validation errorMessage={errorMessage} name="aboutMe" />
            </PopupWithForm>
    );
}

export default EditProfilePopup;

