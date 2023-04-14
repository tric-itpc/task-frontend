import React, { FC, ReactElement, ReactFragment } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getInputSecondName } from "../../redux/selectors/FormSelectors";
import {
    setSecondNameDirty,
    setSecondNameValue,
} from "../../redux/reducers/FormSlice";
import ErrorMessage from "./ErrorMessage";

const enum classes {
    INPUT = "form__input",
    INPUT_ERROR = "form__input form__input_red",
}

const SecondName: FC = (): ReactElement<ReactFragment> => {
    const dispatch = useAppDispatch();
    const secondName = useAppSelector(getInputSecondName);

    const blurHandler = () => dispatch(setSecondNameDirty());

    const secondNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSecondNameValue(e.target.value));
    };

    return (
        <>
            {secondName.dirty && secondName.error && (
                <ErrorMessage text={secondName.error} />
            )}
            <input
                className={classes.INPUT}
                type="text"
                placeholder="Ваша фамилия"
                name="second-name"
                value={secondName.value}
                onChange={secondNameHandler}
                onBlur={blurHandler}
            />
        </>
    );
};

export default SecondName;
