import { useState, useEffect } from "react";

function useCheckButtonState(form, isValid) {
    const [submitBtnState, setSubmitBtnState] = useState(false)

    useEffect(() => {
        if (form) {
            if (form.checkValidity()) {
                setSubmitBtnState(true);
            } else setSubmitBtnState(false);
        }
    }, [form, isValid, submitBtnState]);

    return submitBtnState;
}

export default useCheckButtonState;