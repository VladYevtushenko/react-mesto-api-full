import React from 'react';
import useCheckButtonState from '../../utils/useCheckButtonState';

function PopupWithForm ({
    name, 
    title, 
    children, 
    isOpen, 
    onClose, 
    onSubmit,
    isValid,
    buttonText = 'Сохранить',
}) {
    const formRef = React.useRef();
    const submitButtonState = useCheckButtonState(formRef.current, isValid);

    function closeByOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }

    return (
        <div 
            className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} 
            onMouseDown={closeByOverlay}
        >
            <div className="popup__container">
                <h2 className="popup__heading">{title}</h2>
                <form 
                    ref={formRef}
                    method="post"
                    className={`popup__form popup__form_type_${name}`} 
                    name={name} 
                    id={name}
                    noValidate 
                    onSubmit={onSubmit}
                    onChange={isValid}
                >
                    {children}
                    <button 
                        className={`popup__save-button popup__save-button${submitButtonState ? '' : '_disabled'}`} 
                        type='submit'
                        disabled={!submitButtonState}
                        form={name}
                    >
                        {buttonText}
                    </button>
                </form>
                <button 
                    className="popup__close-button popup__close-button_type_profile" 
                    aria-label="close-button" 
                    type="button" 
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}

export default PopupWithForm;