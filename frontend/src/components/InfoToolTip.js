import React from 'react';
import success from '../images/Success.svg';
import reject from '../images/Reject.svg';

function InfoToolTip({ isSignup, signupError, onClose }) {
    const image = isSignup ? success : reject;

    return (
        <div
            className={`tooltip tooltip_opened`}
            onClick={onClose}
        >
            <div
                className="tooltip__container" 
                onMouseDown={(e) => e.stopPropagation()}
            >
            <button
                className="tooltip__close-btn"
                type="button"
                onClick={onClose}
            ></button>
                <div
                    className="tooltip__image"
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
                <h2 className={`tooltip__message tooltip__message_type`}>
                    {isSignup ? 'Вы успешно зарегистрировались!' : `${signupError}.`}
                </h2> 
            </div>
        </div>
    )
}

export default InfoToolTip;