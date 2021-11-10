import { FC } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Simulate } from 'react-dom/test-utils';
import { Input } from '../Input';
import { Button } from '../Button';
import { Select } from '../Select';
import { ErrorMsg } from '../ErrorMsg';
import { SelectOption } from '../Select/types';
import { Feedback, FeedbackFormValidationSchema } from './types';

const INITIAL_VALUES: Feedback = {
  name: '',
  family: '',
  email: '',
  category: '',
  message: '',
  img: '',
  file: null,
};

const OPTION_LIST: SelectOption[] = [
  { id: 1, title: 'Ошибка', value: 'error' },
  { id: 2, title: 'Сообщение', value: 'message' },
  { id: 3, title: 'Жалоба', value: 'complaint' },
  { id: 4, title: 'Уведомление', value: 'Notification' },
];

export const FeedbackForm: FC = () => {
  const formik = useFormik<Feedback>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values) => {
      //формируем объект для передачи данных
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('family', values.family);
      formData.append('email', values.email);
      formData.append('category', values.category);
      formData.append('message', values.message);
      if (values.file) {
        formData.append('file', values.file);
      }
      //отправляем

      axios.post('http://localhost.dev', formData).catch((error) => {
        console.log(error);
      });

      const msg =
        'Данные для примера отправлены на несуществующий адрес "http://localhost.dev" !!! ' +
        'Подробности на вкладке NETWORK в devTools Браузера, либо в консоли!';
      alert(msg);
    },
    validationSchema: FeedbackFormValidationSchema,
  });

  return (
    <div className="feedback-form__wrap">
      <h2 className="feedback-form__title">Форма обратной связи</h2>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        autoComplete={'off'}
        className="feedback-form"
      >
        <div className="feedback-form__elements-wrap">
          <div className="feedback-form__element">
            <Input
              label={'имя'}
              placeholder={'введите имя'}
              type={'text'}
              {...formik.getFieldProps('name')}
            />
            <ErrorMsg
              showError={
                Boolean(formik.touched.name) && Boolean(formik.errors.name)
              }
              error={formik.errors.name}
            />
          </div>
          <div className="feedback-form__element">
            <Input
              label={'фамилия'}
              placeholder={'введите фамилию'}
              type={'text'}
              {...formik.getFieldProps('family')}
            />
            <ErrorMsg
              showError={
                Boolean(formik.touched.family) && Boolean(formik.errors.family)
              }
              error={formik.errors.family}
            />
          </div>
        </div>
        <div className="feedback-form__elements-wrap">
          <div className="feedback-form__element">
            <Input
              label={'email'}
              placeholder={'введите email'}
              type={'text'}
              {...formik.getFieldProps('email')}
            />
            <ErrorMsg
              showError={
                Boolean(formik.touched.email) && Boolean(formik.errors.email)
              }
              error={formik.errors.email}
            />
          </div>
          <div className="feedback-form__element">
            <Select
              label={'Категория'}
              placeholder={'выберите категорию'}
              optionList={OPTION_LIST}
              {...formik.getFieldProps('category')}
            />
            <ErrorMsg
              showError={
                Boolean(formik.touched.category) &&
                Boolean(formik.errors.category)
              }
              error={formik.errors.category}
            />
          </div>
        </div>
        <div className="feedback-form__elements-wrap">
          <div className="feedback-form__element">
            <Input
              label={'сообщение'}
              placeholder={'введите сообщение'}
              type={'text'}
              {...formik.getFieldProps('message')}
            />
            <ErrorMsg
              showError={
                Boolean(formik.touched.message) &&
                Boolean(formik.errors.message)
              }
              error={formik.errors.message}
            />
          </div>
        </div>
        <div className="feedback-form__elements-wrap">
          <div className="feedback-form__element">
            <Input
              label={'выберите картинку'}
              placeholder={'выберите картинку'}
              type={'file'}
              {...formik.getFieldProps('img')}
              onChange={(e) => {
                formik.setFieldValue('img', e.target.value);
                if (e.target.files) {
                  formik.setFieldValue('file', e.target.files[0]);
                }
              }}
            />
            <ErrorMsg
              showError={
                Boolean(formik.touched.img) && Boolean(formik.errors.file)
              }
              error={formik.errors.file}
            />
          </div>
        </div>
        <div className="feedback-form__elements-wrap">
          <div className="feedback-form__submit-button-wrap">
            <Button type={'submit'} caption={'Отправить'} />
          </div>
        </div>
      </form>
    </div>
  );
};
