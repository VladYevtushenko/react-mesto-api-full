import { useState, useRef } from "react";
import Validation from "../utils/Validation";
import useCheckButtonState from "../utils/useCheckButtonState";

function Login({ title, onLogin, isValid, buttonText, errorMessage }) {
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
        console.log('hi');

        onLogin(password, email);
    }

    return (
        <div className="auth">
            <form 
                ref={authRef}
                className="auth__form"
                noValidate
                name="login"
                method="post"
                id="login"
                action="#"
                onSubmit={handleSubmit}
                onChange={isValid}
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
                    disabled={!submitButtonState}
                    form="login"
                >
                    {buttonText}
                </button>
            </form>
        </div>
    )
}

export default Login;