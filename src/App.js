import React, { useState } from 'react';
import { useForm } from './hooks/useForm';
import InputPopup from './components/Input';
import TextAreaInPopup from './components/Textarea';

function App() {
  const name = useForm('', { isEmpty: true, minLength: 2, isName: true });
  const family = useForm('', { isEmpty: true, minLength: 2, isName: true });
  const email = useForm('', { isEmpty: true, minLength: 3, isEmail: true });
  const category = useForm('', { isEmpty: true });
  const textFeedback = useForm('', { isEmpty: true, minLength: 10 });
  const file = useForm('', { isEmpty: true, isName: true, isSizeFile: 2 });

  const [resultEvent, setResultEvent] = useState({});
  const [listFeedback, setListFeedback] = useState([]);

  function addFeedback(feedback) {
    setListFeedback((prev) => [...prev, feedback]);
  }

  const submitHandler = async (evt) => {
    evt.preventDefault();

    const result = {
      id: Math.floor(Math.random() * 1000000),
      name: name.value || '',
      family: family.value || '',
      email: email.value,
      category: category.value,
      textFeedback: textFeedback.value,
      file: file.value,
    };

    setResultEvent(result);
    addFeedback(result);
    name.resetFrom();
    family.resetFrom();
    email.resetFrom();
    category.resetFrom();
    textFeedback.resetFrom();
    file.resetFrom();
  };

  const buttonDisabled =
    !file.inputValid ||
    !textFeedback.inputValid ||
    !category.inputValid ||
    !email.inputValid ||
    (!family.inputValid && !name.inputValid);

  // Оставил чтобы видно было сохранение данных
  //console.log(resultEvent);
  console.log(listFeedback);
  return (
    <div className='feedback container'>
      <h1 className='feedback__title'>Обратная связь</h1>

      <form className='form feedback__form' onSubmit={submitHandler}>
        <InputPopup
          name='name'
          type='text'
          className='form__input'
          placeholder='Имя'
          autoComplete='off'
          value={name.value}
          onChange={(evt) => name.handleChange(evt)}
          onBlur={(evt) => name.onBlur(evt)}
          isData={name}
        />

        <InputPopup
          name='family'
          type='text'
          className='form__input'
          placeholder='Фамилия'
          autoComplete='off'
          value={family.value}
          onChange={(evt) => family.handleChange(evt)}
          onBlur={(evt) => family.onBlur(evt)}
          isData={family}
        />

        <InputPopup
          name='email'
          type='email'
          className='form__input'
          placeholder='Эл.почта'
          autoComplete='off'
          value={email.value}
          onChange={(evt) => email.handleChange(evt)}
          onBlur={(evt) => email.onBlur(evt)}
          isData={email}
        />

        <div className='select'>
          <label
            className='form__label form__label-extend'
            htmlFor='standard-select'>
            Тема вопроса:
          </label>
          <select
            className='select__sel'
            id='standard-select'
            name='category'
            value={category.value}
            onChange={(evt) => category.handleChange(evt)}
            onBlur={(evt) => category.onBlur(evt)}>
            <option
              value='0 category'
              style={{ userSelect: 'none', display: 'none' }}></option>
            <option value='1 category'>1 категория</option>
            <option value='2 category'>2 категория</option>
            <option value='3 category'>3 категория</option>
            <option value='4 category'>4 категория</option>
          </select>
          <span className='form__input-error'>
            {category.isBlur && !category.value ? 'Выберите категорию.' : ''}
          </span>
        </div>
        <TextAreaInPopup
          placeholder='Сообщение'
          id='textFeedback'
          name='textFeedback'
          value={textFeedback.value}
          onChange={(evt) => textFeedback.handleChange(evt)}
          onBlur={(evt) => textFeedback.onBlur(evt)}
          isData={textFeedback}
        />
        <InputPopup
          name='file'
          type='file'
          className='form__input'
          autoComplete='off'
          value={file.value}
          onChange={(evt) => file.handleChange(evt)}
          onBlur={(evt) => file.onBlur(evt)}
          isData={file}
        />
        <button
          type='submit'
          className='form__button'
          disabled={buttonDisabled}>
          Отправить
        </button>
      </form>
    </div>
  );
}

export default App;
