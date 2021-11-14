import React from 'react';
import { Formik } from 'formik';
import { initialValues, validation } from './utils/validationSchema';
import { FormInput } from './components/FormInput';
import { Dropdown } from './components/Dropdown';
import { UploadFile } from './components/UploadFile';

const App: React.FC = () => {
  const options = [
    { id: 1, value: '', text: 'Выберите категорию сообщения:' },
    { id: 2, value: 'thanks', text: 'Благодарность' },
    { id: 3, value: 'complaint', text: 'Жалоба' },
    { id: 4, value: 'comment', text: 'Предложение' }
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      validateOnBlur
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
        <div className='form'>
          <div className='container'>
            <form className='form__content content-form' onSubmit={handleSubmit}>
              <h3 className='content-form__title'>Форма обратной связи</h3>
              <FormInput
                text='Введите Имя:'
                type='text'
                htmlFor='firstName'
                touched={touched.firstName}
                errors={errors.firstName}
                value={values.firstName}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <FormInput
                text='Введите Фамилию:'
                type='text'
                htmlFor='lastName'
                touched={touched.lastName}
                errors={errors.lastName}
                value={values.lastName}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <FormInput
                text='Введите Email:'
                type='text'
                htmlFor='email'
                value={values.email}
                touched={touched.email}
                errors={errors.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <Dropdown
                options={options}
                touched={touched.categories}
                errors={errors.categories}
                name='categories'
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <label className='content-form__label' htmlFor='message'>Введите сообщение:</label>
              <textarea
                className='content-form__textarea'
                name='message'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
              {touched.message && errors.message && <div className='error-msg'>{errors.message}</div>}

              <UploadFile errors={errors} values={values} />

              <div className='content-form__btn'>
                <button type='submit'>Отправить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik >
  );
}

export default App;