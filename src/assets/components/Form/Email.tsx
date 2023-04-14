import React, { FC, ReactElement, ReactFragment } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getInputEmail } from "../../redux/selectors/FormSelectors";
import { setEmailDirty, setEmailValue } from "../../redux/reducers/FormSlice";
import ErrorMessage from "./ErrorMessage";

const enum classes {
    INPUT = "form__input",
    INPUT_ERROR = "form__input form__input_red",
}

const Email: FC = (): ReactElement<ReactFragment> => {
    const dispatch = useAppDispatch();
    const email = useAppSelector(getInputEmail);

    const blurHandler = () => dispatch(setEmailDirty());

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmailValue(e.target.value));
    };

    return (
        <>
            {email.dirty && email.error && <ErrorMessage text={email.error} />}
            <input
                className={!email.error ? classes.INPUT : classes.INPUT_ERROR}
                type="email"
                placeholder="Ваш email*"
                name="email"
                title="Введите Ваш email"
                value={email.value}
                onChange={emailHandler}
                onBlur={blurHandler}
            />
        </>
    );
};

export default Email;
