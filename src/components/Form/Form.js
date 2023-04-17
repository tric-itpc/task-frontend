import { useState } from "react";
import "./form.css";

function Form({setFormData}) {
  const [formValue, setFormValue] = useState({});

  //решил не делать кастомный хук валидации, так что всё базировано здесь 
  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataJSON = JSON.stringify(formValue); //переводим всё в json
    setFormData(dataJSON);
  };

  return (
    <form className="form" action="#" onSubmit={handleSubmit}>
      <h1 className="form__title">Форма обратной связи</h1>
      <input
        className="form__input"
        type="text"
        placeholder="Ваше имя"
        minLength={3}
        onChange={handleChange}
        name="yourName"
      />
      <input
        className="form__input"
        type="text"
        placeholder="Ваша фамилия"
        required
        minLength={3}
        onChange={handleChange}
        name="yourSecondName"
      />
      <input
        className="form__input"
        type="email"
        placeholder="Ваш email"
        required
        minLength={3}
        onChange={handleChange}
        name="email"
      />
      <label className="form__label">
        <h2 className="form__subtitle">Цель обращения</h2>
        <select
          className="form__select"
          name="category"
          id="category"
          required
          onChange={handleChange}
        >
          <option className="form__option" value=""></option>
          <option className="form__option" value="application">
            Заявка
          </option>
          <option className="form__option" value="complaint">
            Жалоба
          </option>
          <option className="form__option" value="vacancy">
            Вакансия frontend
          </option>
        </select>
      </label>
      <textarea
        name="text"
        className="form__text"
        required
        minLength={10}
        onChange={handleChange}
      ></textarea>
      <label className="form__input-file">
        <input
          type="file"
          name="file"
          accept=" .jpg, .png"
          size="2000000"
          onChange={handleChange}
        />
        <span className="form__input-file-btn">Выберите файл</span>
        <span className="form__input-file-text">Максимум 2мб</span>
      </label>
      <button className="form__submit" type="submit">
        Отправить обращение
      </button>
    </form>
  );
}

export default Form;
