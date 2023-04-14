import React, { FC, ReactElement, ReactFragment } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCategory, getMessage } from "../../redux/selectors/FormSelectors";
import {
    setMessageDirty,
    setMessageValue,
} from "../../redux/reducers/FormSlice";
import TextareaAutosize from "react-textarea-autosize";
import ErrorMessage from "./ErrorMessage";

const enum classes {
    MESSAGE = "form__message",
    MESSAGE_ERROR = "form__message form__message_red",
}

const Message: FC = (): ReactElement<ReactFragment> => {
    const dispatch = useAppDispatch();
    const message = useAppSelector(getMessage);
    const category = useAppSelector(getCategory);

    const blurHandler = () => dispatch(setMessageDirty());

    const messageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setMessageValue(e.target.value));
    };

    return (
        <>
            {message.dirty && message.error && (
                <ErrorMessage text={message.error} />
            )}
            <TextareaAutosize
                className={
                    !message.error ? classes.MESSAGE : classes.MESSAGE_ERROR
                }
                placeholder="Введите текст сообщения*"
                name="message"
                title={
                    category.value === "empty"
                        ? "Невозможно ввести текст! Выберите тип обращения!"
                        : "Напишите обращение (не менее 10 символов)"
                }
                minRows={2}
                maxRows={8}
                disabled={category.value === "empty"}
                value={message.value}
                onChange={messageHandler}
                onBlur={blurHandler}
            />
        </>
    );
};

export default Message;
