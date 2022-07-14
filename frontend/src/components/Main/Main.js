import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Card from '../Card/Card.js';

function Main({ 
    onEditAvatar, 
    onEditProfile, 
    onAddPlace, 
    onCardClick, 
    onCardLike, 
    onCardDelete, 
    cards 
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__info">
                    <img 
                        src={currentUser.avatar} 
                        alt="аватар профиля" 
                        className="profile__avatar" 
                    />
                    <div className="profile__avatar-overlay">
                        <button 
                            className="profile__avatar-edit" 
                            type="button" 
                            aria-label="avatar-edit" 
                            onClick={onEditAvatar}
                        ></button>
                    </div>
                    <div className="profile__item">
                        <div className="profile__name-box">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button 
                                className="profile__edit-button" 
                                aria-label="edit-profile" 
                                type="button" 
                                onClick={onEditProfile}
                            ></button>
                        </div>
                        <p className="profile__about-me">{currentUser.about}</p>
                    </div>
                </div>
                <button 
                    className="profile__add-button" 
                    aria-label="add-button" 
                    type="button" 
                    onClick={onAddPlace}
                ></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card 
                            card={card} 
                            key={card._id} 
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike} 
                            onCardDelete={onCardDelete} 
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;