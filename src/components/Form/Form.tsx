import React from 'react'
import useForm from '../../hooks/useForm';
import validateInfo from '../../validateInfo';
import './Form.scss';
import './FormMedia.scss';

interface FormProps {
    submitFrom: () => void
}
const Form: React.FC<FormProps> = ({
    submitFrom
}): React.ReactElement => {

    const {
        values,
        handlerChange,
        handleSubmit,
        handlerSetFiles,
        errors
    } = useForm(submitFrom, validateInfo)

    return (
        <form 
            className="form"
            onSubmit={handleSubmit}
        >

            <div className="form__block">
                <h1 className="form__title">
                Форма обратной связи
                </h1>
                <div className="form-person">
                    <input 
                        type="text"
                        className="form__input form-person__input"
                        placeholder="Имя"
                        name="name"
                        onChange={handlerChange}
                        value={values.name}
                    />
                    <input 
                        type="text"
                        className="form__input form-person__input"
                        placeholder="Фамилия"
                        onChange={handlerChange}
                        name="secondName"
                        value={values.secondName}
                    />
                    <div className="form__error">{errors.person}</div>
                    <input 
                        type="text"
                        className="form__input form-person__input"
                        placeholder="Email"
                        onChange={handlerChange}
                        name="email"
                        value={values.email}
                    />
                    <div className="form__error">{errors.email}</div>
                </div>

                <select 
                    onChange={handlerChange}
                    name="title"
                    defaultValue="choose"
                    className="form__select"
                >
                    <option 
                        className="form__option-title"
                        disabled value='choose'> Выберете категорию сообщения </option>
                    <option 
                        value="1"
                        className="form__option"
                    >Пункт 1</option>
                    <option 
                        value="2"
                        className="form__option"
                    >Пункт 2</option>
                    <option 
                        value="3"
                        className="form__option"
                    >Пункт 3</option>
                </select>
                <div className="form__error">{errors.title}</div>

                <textarea 
                    className="form__textarea"
                    placeholder="Сообщение"
                    onChange={handlerChange}
                    name="text"
                    value={values.text}
                />
                <div className="form__error">{errors.text}</div>

                <div className="form__file">
                    <label className="form__file-label">
                        <input 
                            className="form__file-input"
                            type="file" 
                            onChange={handlerSetFiles}/>
                        <span
                             className="form__file-add"
                        >+</span>
                    </label>
                    <span className="form__file-text">
                        {values.file 
                            ? values.file.name 
                            : 'Добавить файл'
                        }
                    </span>
                </div>
                <div className="form__error">{errors.file}</div>
                <button 
                    onClick={handleSubmit} 
                    type="submit"
                    className="form__btn"
                >
                    Отправить
                </button>


                <div className="form__decoration form__decoration_first"/>
                <div className="form__decoration form__decoration_second"/>
                <div className="form__decoration form__decoration_third"/>
                <div className="form__decoration form__decoration_fourth"/>
                <div className="form__decoration form__decoration_fifth"/>
                <div className="form__decoration form__decoration_sixth"/>
                <div className="form__decoration form__decoration_circle"/>

            </div>
      </form>
    )
}

export default React.memo(Form)
