import * as yup from 'yup';
import { initialValuesType } from '../types/types';

const initialValues: initialValuesType = {
  firstName: '',
  lastName: '',
  email: '',
  categories: '',
  message: '',
  file: undefined
};

const validation = yup.object().shape({
  firstName: yup.string().when('lastName', {
    is: (value: string) => !value,
    then: yup.string().required('Введите имя и/или фамилию!'),
    otherwise: yup.string(),
  }),
  lastName: yup.string().when('firstName', {
    is: (value: string) => !value,
    then: yup.string().required('Введите имя и/или фамилию!'),
    otherwise: yup.string(),
  }),
  email: yup.string().email('Введите валидный email!').required('Введите Email!'),
  categories: yup.string().required('Выберите категорию!'),
  message: yup.string().min(10, 'Минимум 10 символов!').required('Сообщение не может быть пустым!'),
  file: yup.array().of(yup.object().shape({
    file: yup.mixed().test('fileSize', 'Файл не должен первышать 2МБ!', (value) => {
      if (!value) {
        return false;
      }
      return value.size < 2000000;
    }).required(),
    type: yup.string().oneOf(['image/jpeg', 'image/png'], 'Выберите файл в формате jpg/png'),
    name: yup.string().required(),
  })
    .typeError('Выберите файл')
  ),
}, [['firstName', 'lastName']]
);

export { initialValues, validation };