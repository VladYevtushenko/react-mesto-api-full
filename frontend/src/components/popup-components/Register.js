import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Validation from "../../utils/Validation";
import useCheckButtonState from "../../utils/useCheckButtonState";

function Register({ title, onRegister, isValid, buttonText, errorMessage, resetValidation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authRef = useRef();

    const submitButtonState = useCheckButtonState(authRef.current ,isValid);

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleFocus(e) {
        e.target.select();
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(password, email);
    }


    return (
        <div className="auth">
            <form 
                ref={authRef} 
                className="auth__form"
                noValidate
                name="register"
                action="#"
                id="register"
                method="post"
                onChange={isValid}
                onSubmit={handleSubmit}
            >
                <h2 className="auth__title">{title}</h2>
                <input 
                    className="auth__input auth__input_type_email"
                    value={email}
                    type="email"
                    required
                    onFocus={handleFocus}
                    name="email"
                    placeholder="Email"
                    onChange={handleEmail}
                />
                <Validation errorMessage={errorMessage} name="email" />

                <input 
                    className="auth__input auth__input_type_password"
                    value={password}
                    type="password"
                    required
                    minLength="4"
                    maxLength="20"
                    onFocus={handleFocus}
                    name="password"
                    placeholder="Password"
                    onChange={handlePassword}
                />
                <Validation errorMessage={errorMessage} name="password" />

                <button 
                    className={`auth__submit-btn auth__submit-btn${submitButtonState ? '' : '_disabled'}`}
                    type="submit"
                    form="register"
                    disabled={!submitButtonState}
                >
                    {buttonText}
                </button>
                    <div className="auth__login-proposal auth__login-proposal_active">
                        <Link 
                            to="/sign-in" 
                            className="auth__login-link"
                            onClick={resetValidation}
                        >
                            Уже зарегистрированы? Войти
                        </Link>
                    </div>
            </form>
        </div>
    )
}

export default Register;