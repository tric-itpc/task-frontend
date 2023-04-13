import { FC, ReactElement } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./Form.sass";

const Form: FC = (): ReactElement<HTMLFormElement> => {
    return (
        <form className="form app__form">
            <input className="form__input" type="text" placeholder="Ваше имя" />
            <input
                className="form__input"
                type="text"
                placeholder="Ваша фамилия"
            />
            <input
                className="form__input"
                type="email"
                placeholder="Ваш email"
            />
            <div className="form__select-group">
                <label className="form__select-label" htmlFor="category">
                    Вид обращения:
                </label>
                <select className="form__select" name="category" id="category">
                    <option className="form__option" value="empty"></option>
                    <option className="form__option" value="application">
                        Заявка
                    </option>
                    <option className="form__option" value="complaint">
                        Жалоба
                    </option>
                </select>
            </div>
            <TextareaAutosize
                className="form__message"
                placeholder="Введите текст сообщения"
            />
            <div className="form__image-group">
                <label className="form__image-label" htmlFor="add-image">
                    Изображение&ensp;
                    <i className="fa-solid fa-paperclip"></i>
                </label>
                <input
                    className="form__image-input"
                    type="file"
                    name="image"
                    id="add-image"
                    accept=".jpeg, .jpg, .png"
                />
            </div>
            <button className="form__btn-submit" type="submit">
                Отправить обращение
            </button>
        </form>
    );
};

export default Form;
