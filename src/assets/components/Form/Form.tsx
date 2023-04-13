import { FC, ReactElement, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ErrorMessage from "./ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    getCategory,
    getImage,
    getInputEmail,
    getInputFirstName,
    getInputSecondName,
    getMessage,
    getValidation,
} from "../../redux/selectors/FormSelectors";
import {
    setCategoryDirty,
    setCategoryErrorMessage,
    setCategoryValue,
    setEmailDirty,
    setEmailErrorMessage,
    setEmailValue,
    setFirstNameDirty,
    setFirstNameErrorMessage,
    setFirstNameValue,
    setImageDirty,
    setImageErrorMessage,
    setImageName,
    setImageValue,
    setIsValid,
    setMessageDirty,
    setMessageErrorMessage,
    setMessageValue,
    setSecondNameDirty,
    setSecondNameErrorMessage,
    setSecondNameValue,
} from "../../redux/reducers/FormSlice";

import "./Form.sass";

const enum classes {
    FORM = "form app__form",
    INPUT = "form__input",
    INPUT_ERROR = "form__input form__input_red",
    SELECT_GROUP = "form__select-group",
    SELECT_LABEL = "form__select-label",
    SELECT = "form__select",
    SELECT_ERROR = "form__select form__select_red",
    OPTION = "form__option",
    MESSAGE = "form__message",
    MESSAGE_ERROR = "form__message form__message_red",
    IMAGE_GROUP = "form__image-group",
    IMAGE_LABEL = "form__image-label",
    IMAGE_ERROR = "form__image-label form__image-label_red",
    IMAGE_INPUT = "form__image-input",
    SUBMIT = "form__btn-submit",
    ATTACHED = "form__img-attached",
}

const Form: FC = (): ReactElement<HTMLFormElement> => {
    const dispatch = useAppDispatch();

    const firstName = useAppSelector(getInputFirstName);
    const secondName = useAppSelector(getInputSecondName);
    const email = useAppSelector(getInputEmail);
    const category = useAppSelector(getCategory);
    const message = useAppSelector(getMessage);
    const image = useAppSelector(getImage);
    const isValid = useAppSelector(getValidation);

    useEffect(() => {
        if (firstName.error || email.error || category.error || message.error) {
            dispatch(setIsValid(false));
        } else {
            dispatch(setIsValid(true));
        }
    }, [firstName.error, email.error, category.error, message.error]);

    const blurHandler = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        switch (e.target.name) {
            case "first-name":
                dispatch(setFirstNameDirty());
                break;
            case "second-name":
                dispatch(setSecondNameDirty());
                break;
            case "email":
                dispatch(setEmailDirty());
                break;
            case "message":
                dispatch(setMessageDirty());
                break;
            case "category":
                dispatch(setCategoryDirty());
                break;
            case "image":
                dispatch(setImageDirty());
                break;
        }
    };

    const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFirstNameValue(e.target.value));
        const re = /^[а-яА-ЯёЁa-zA-Z]+$/;
        if (!String(e.target.value).toLowerCase().match(re)) {
            dispatch(
                setFirstNameErrorMessage("Имя не должно содержать чисел!")
            );
            if (!e.target.value) {
                dispatch(
                    setFirstNameErrorMessage("Поле должно быть заполнено!")
                );
            }
        } else {
            dispatch(setFirstNameErrorMessage(""));
        }
    };

    const secondNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSecondNameValue(e.target.value));
        const re = /^[а-яА-ЯёЁa-zA-Z]+$/;
        if (!String(e.target.value).toLowerCase().match(re)) {
            dispatch(
                setSecondNameErrorMessage("Фамилия не должна содержать чисел!")
            );
            if (!e.target.value) {
                dispatch(setSecondNameErrorMessage(""));
            }
        } else {
            dispatch(setSecondNameErrorMessage(""));
        }
    };

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmailValue(e.target.value));

        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!String(e.target.value).toLowerCase().match(re)) {
            dispatch(setEmailErrorMessage("Email введён не корректно!"));
            if (!e.target.value) {
                dispatch(setEmailErrorMessage("Поле должно быть заполнено!"));
            }
        } else {
            dispatch(setEmailErrorMessage(""));
        }
    };

    const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCategoryValue(e.target.value));
        if (e.target.value === "empty") {
            dispatch(setCategoryErrorMessage("Выберите тип обращения!"));
        } else {
            dispatch(setCategoryErrorMessage(""));
        }
    };

    const messageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setMessageValue(e.target.value));
        if (e.target.value.length < 10) {
            dispatch(setMessageErrorMessage("Сообщение не менее 10 символов!"));
            if (!e.target.value) {
                dispatch(setMessageErrorMessage("Поле должно быть заполнено!"));
            }
        } else {
            dispatch(setMessageErrorMessage(""));
        }
    };

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files[0]);
        if (e.target.files && e.target.files[0].size > 2097152) {
            // dispatch(setImageValue(""));
            dispatch(setImageErrorMessage("Файл не должен превышать 2Мб"));
        } else if (e.target.files) {
            dispatch(setImageValue(e.target.value));
            dispatch(setImageName(e.target.files[0].name));
            dispatch(setImageErrorMessage(""));
        }
    };

    return (
        <form className={classes.FORM}>
            {firstName.dirty && firstName.error && (
                <ErrorMessage text={firstName.error} />
            )}
            <input
                className={classes.INPUT}
                type="text"
                placeholder="Ваше имя"
                name="first-name"
                value={firstName.value}
                onChange={firstNameHandler}
                onBlur={blurHandler}
            />
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
            {email.dirty && email.error && <ErrorMessage text={email.error} />}
            <input
                className={classes.INPUT}
                type="email"
                placeholder="Ваш email"
                name="email"
                value={email.value}
                onChange={emailHandler}
                onBlur={blurHandler}
            />
            {category.dirty && category.error && (
                <ErrorMessage text={category.error} />
            )}
            <div className={classes.SELECT_GROUP}>
                <label className={classes.SELECT_LABEL} htmlFor="category">
                    Вид обращения:
                </label>
                <select
                    className={classes.SELECT}
                    name="category"
                    id="category"
                    value={category.value}
                    onChange={categoryHandler}
                    onBlur={blurHandler}
                >
                    <option className={classes.OPTION} value="empty"></option>
                    <option className={classes.OPTION} value="application">
                        Заявка
                    </option>
                    <option className={classes.OPTION} value="complaint">
                        Жалоба
                    </option>
                </select>
            </div>
            {message.dirty && message.error && (
                <ErrorMessage text={message.error} />
            )}
            <TextareaAutosize
                className={classes.MESSAGE}
                placeholder="Введите текст сообщения"
                name="message"
                minRows={2}
                maxRows={8}
                value={message.value}
                onChange={messageHandler}
                onBlur={blurHandler}
            />
            {image.error && <ErrorMessage text={image.error} />}
            <div className={classes.IMAGE_GROUP}>
                <label className={classes.IMAGE_LABEL} htmlFor="add-image">
                    Изображение&ensp;
                    <i className="fa-solid fa-paperclip"></i>
                </label>
                <input
                    className={classes.IMAGE_INPUT}
                    type="file"
                    name="image"
                    id="add-image"
                    accept=".jpeg, .jpg, .png"
                    onBlur={blurHandler}
                    value={image.value}
                    onChange={imageHandler}
                />
                {image.name && (
                    <div className={classes.ATTACHED}>
                        {image.name.length > 10
                            ? `${image.name.slice(0, 10)}...`
                            : image.name}
                    </div>
                )}
            </div>
            <button className={classes.SUBMIT} type="submit" disabled={isValid}>
                Отправить обращение
            </button>
        </form>
    );
};

export default Form;
