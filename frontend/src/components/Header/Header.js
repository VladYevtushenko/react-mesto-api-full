import React, { useState, useEffect } from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from '../../images/Mesto.svg';
import closeBtn from '../../images/Close-Icon.svg';
import burgerBtn from '../../images/burger.svg';

function Header ({ loggedIn, email, resetValidation, onSignOut }) {
    const [isInvisible, setIsInvisible] = useState(true);
    const mobileBtn = isInvisible ? burgerBtn : closeBtn;


    function handleBurgerBtnClick() {
        isInvisible ? setIsInvisible(false): setIsInvisible(true);
    }

    useEffect(() => {
        if(!loggedIn) setIsInvisible(true);
    }, [loggedIn]);

    return (
        <header className="header">
            <div
                className={`header__container header__container${loggedIn ? '_logged' : ''}`}
            >
                <div
                    className={`header__logo-container header__logo-container${loggedIn ? '_logged' : ''}`}
                >
                    <img src={logo} alt="лого сервиса Mesto" className="header__logo" />
                    <button 
                        className={`header__burger-btn header__burger-btn${loggedIn ? '' : '_invisible'}}`}
                        type="button"
                        style={{ backgroundImage: `url(${loggedIn ? mobileBtn : '' })` }}
                        onClick={handleBurgerBtnClick}
                    ></button>
                </div>
                <div className={`header__auth 
                    header__auth${isInvisible && loggedIn ? '_unlogged' : ''}
                    header__auth${loggedIn ? '_logged' : ''}`}
                >
                    <p className="header__email">{email}</p>
                    <button 
                        onClick={onSignOut}
                        className={`header__logout header__logout${loggedIn ? '_active' : ''}`}
                    >
                        Выйти
                    </button>
                    <nav className={`header__nav header__nav${!loggedIn ? '_active' : ''}`}>
                        <Route path="/sign-in">
                            <NavLink 
                                to="/sign-up" 
                                activeClassName="header__link" 
                                className="header__link_active"
                                onClick={resetValidation}
                            >
                                Регистрация
                            </NavLink>
                        </Route>
                        <Route path="/sign-up">
                            <NavLink 
                                to="/sign-in"
                                activeClassName="header__link"
                                className="header__link_active"
                                onClick={resetValidation}
                            >
                                Войти
                            </NavLink>
                        </Route>

                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
