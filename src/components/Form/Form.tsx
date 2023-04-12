import { Tooltip } from '../Tooltip';
import './form-style.css';
import { useForm } from 'react-hook-form';

const Form = () => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const submit = (data: any) => {
    alert(JSON.stringify(data));
    reset();
  }  

  return (
    <form
      className='form'
      onSubmit={handleSubmit(submit)}
    >
      <h1 className='form__title'>Форма обратной связи</h1>
      <label className='form__row'>
        <span className='form__name'>Введите имя:*</span>
        <input
          {...register('firstName', {
            required: 'Поле обязательное к заполнению',
            pattern: {
              value: /^[a-zа-я]*$/i,
              message: "Имя может состоять только из букв"
            },
            minLength: {
              value: 2,
              message: 'Короткое имя'
            }
          })}
          className='form__input'
        />
        {errors?.firstName && <Tooltip message={JSON.stringify(errors.firstName.message)} />}
      </label>
      <label className='form__row'>
        <span className='form__name'>Введите фамилию:*</span>
        <input
          {...register('lastName', {
            required: 'Поле обязательное к заполнению',
            pattern: {
              value: /^[a-zа-я]*$/i,
              message: "Фамилия может состоять только из букв"
            },
            minLength: {
              value: 3,
              message: 'Слишком короткая фамилия'
            },
          })}
          className='form__input'
        />
        {errors?.lastName && <Tooltip message={JSON.stringify(errors.lastName.message)} />}
      </label>
      <label className='form__row'>
        <span className='form__name'>Введите ваш email:*</span>
        <input
          {...register('email', {
            required: 'Поле обязательное к заполнению',
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i,
              message: "Не правильный адресс электронной почты"
            },
            minLength: {
              value: 3,
              message: 'Слишком короткая фамилия'
            },
          })}
          className='form__input'
        />
        {errors?.email && <Tooltip message={JSON.stringify(errors.email.message)} />}
      </label>
      <label className='form__row'>
        <span className='form__name'>Выберите категорию:*</span>
        <select
          {...register('categoreis', {
            required: 'Поле обязательное к заполнению',
          })}
          className='form__input form__select'
        >
          <option value=""></option>
          <option value="comment">Коментарий</option>
          <option value="review">Отзыв</option>
          <option value="proposal">Предложение</option>
        </select>
        {errors?.categoreis && <Tooltip message={JSON.stringify(errors.categoreis.message)} />}
      </label>
      <label className='form__row'>
        <span className='form__name'>Оставьте сообщение:*</span>
        <textarea
          {...register('text', {
            required: 'Поле обязательное к заполнению',
            minLength: {
              value: 10,
              message: 'Добавьте сообщение'
            },
          })}
          className='form__input form__text'
        ></textarea>
        {errors?.text && <Tooltip message={JSON.stringify(errors.text.message)} />}
      </label>
      <div
        onClick={(e) => e.currentTarget.lastElementChild?.dispatchEvent(new MouseEvent('click'))}
        className='form__row form__row-file'>
        <span
          className='form__name form__file'
        >Добавить картинку*</span>
        {errors?.file && <Tooltip message={JSON.stringify(errors.file.message)} />}
        <input
          {...register('file', {
            required: 'Добавьте картинку'
          })}
          className='form__input form__file-input'
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <input className='form__input' type="submit" value='Отправить' />
      <input className='form__input' type="reset" value="Сброс" />
    </form>
  )
}

export default Form