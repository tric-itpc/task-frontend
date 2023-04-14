import React, { FC, ReactElement, ReactFragment } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getInputFirstName } from "../../redux/selectors/FormSelectors";
import {
    setFirstNameDirty,
    setFirstNameValue,
} from "../../redux/reducers/FormSlice";
import ErrorMessage from "./ErrorMessage";

const enum classes {
    INPUT = "form__input",
    INPUT_ERROR = "form__input form__input_red",
}

const FirstName: FC = (): ReactElement<ReactFragment> => {
    const dispatch = useAppDispatch();
    const firstName = useAppSelector(getInputFirstName);

    const blurHandler = () => dispatch(setFirstNameDirty());

    const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFirstNameValue(e.target.value));
    };

    return (
        <>
            {firstName.dirty && firstName.error && (
                <ErrorMessage text={firstName.error} />
            )}
            <input
                className={
                    !firstName.error ? classes.INPUT : classes.INPUT_ERROR
                }
                type="text"
                placeholder="Ваше имя*"
                name="first-name"
                title="Введите Ваше имя"
                value={firstName.value}
                onChange={firstNameHandler}
                onBlur={blurHandler}
            />
        </>
    );
};

export default FirstName;
