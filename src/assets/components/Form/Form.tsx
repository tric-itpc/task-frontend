import { FC, ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    getCategory,
    getImage,
    getInputEmail,
    getInputFirstName,
    getInputSecondName,
    getMessage,
} from "../../redux/selectors/FormSelectors";
import { setClearForm, setIsValid } from "../../redux/reducers/FormSlice";
import FirstName from "./FirstName";
import SecondName from "./SecondName";
import Email from "./Email";
import Category from "./Category";
import Message from "./Message";
import Image from "./Image";
import BtnSubmit from "./BtnSubmit";
import "./Form.sass";

const enum classes {
    FORM = "form app__form",
    HELPER = "form__helper",
}

const Form: FC = (): ReactElement<HTMLFormElement> => {
    const dispatch = useAppDispatch();

    const firstName = useAppSelector(getInputFirstName);
    const secondName = useAppSelector(getInputSecondName);
    const email = useAppSelector(getInputEmail);
    const category = useAppSelector(getCategory);
    const message = useAppSelector(getMessage);
    const image = useAppSelector(getImage);

    useEffect(() => {
        if (
            firstName.value &&
            email.value &&
            category.value !== "empty" &&
            message.value
        ) {
            dispatch(setIsValid(true));
        } else {
            dispatch(setIsValid(false));
        }
    }, [firstName.value, email.value, category.value, message.value]);

    const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            firstName: firstName.value,
            secondName: secondName.value,
            email: email.value,
            category: category.value,
            message: message.value,
            image: image.value,
        };
        alert(JSON.stringify(data, null, 2));
        alert("Заявка принята, спасибо!");
        dispatch(setClearForm());
    };

    return (
        <form className={classes.FORM} onSubmit={submitHandler}>
            <FirstName />
            <SecondName />
            <Email />
            <Category />
            <Message />
            <Image />
            <BtnSubmit />
            <div className={classes.HELPER}>* - Поля должны быть заполнены</div>
        </form>
    );
};

export default Form;
