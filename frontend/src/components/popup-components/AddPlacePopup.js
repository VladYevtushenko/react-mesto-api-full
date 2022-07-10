import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Validation from '../../utils/Validation';

function AddPlacePopup ({ 
    isOpen, 
    onClose, 
    onAddPlace, 
    loggedIn, 
    isValid,
    errorMessage,
    buttonText = 'Создать' 
}) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    function handleName(e) {
        setName(e.target.value);
    }

    function handleImage(e) {
        setImage(e.target.value);
    }

    function handleFocus(e) {
        e.target.select();
    }

    useEffect(() => {
        setName('');
        setImage('');
    }, [loggedIn])

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: image
        });
        setName('');
        setImage('');
    }

    return(
        <PopupWithForm 
            name="card" 
            title="Новое место"  
            isOpen={isOpen} 
            onClose={onClose}
            isValid={isValid}
            onSubmit={handleSubmit}
            buttonText={buttonText}
        >
            <input 
                type="text" 
                className="popup__input" 
                placeholder="Название" 
                name="cardName" 
                minLength="2" 
                maxLength="30" 
                value={name}
                onFocus={handleFocus} 
                onChange={handleName}
                required 
            />
            <Validation errorMessage={errorMessage} name="cardName" />

            <input 
                type="url" 
                className="popup__input" 
                placeholder="Ссылка на картинку" 
                name="img" 
                value={image} 
                onChange={handleImage}
                onFocus={handleFocus}
                required
            />
            <Validation errorMessage={errorMessage} name="img" />
        </PopupWithForm>
    );
}

export default AddPlacePopup;