import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button, Card, Container, Typography,
} from '@mui/material';
import ModalAccept from '../ModalAccept';
import { FILE_SIZE, SUPPORTED_FORMATS } from '../../utils/consts/consts';
import { NameField } from '../NameField';
import { SurnameField } from '../SurnameField';
import { EmailField } from '../EmailField';
import { SelectField } from '../SelectField';
import { TextAreaField } from '../TextAreaField';
import { FileField } from '../FileField';
import styles from './index.module.css';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Заполните имя')
    .min(3, 'Имя не может быть столь коротким'),
  surname: yup
    .string()
    .optional()
    .min(3, 'Фамилия не может быть столь коротким'),
  email: yup
    .string()
    .required('Email обязателен')
    .email('Email введен некорректно'),
  select: yup
    .string()
    .required('Выберите категорию'),
  textarea: yup
    .string()
    .required('Это поле обязательно')
    .min(10, 'Сообщение должно быть не короче 10 символов'),
  file: yup
    .mixed()
    .test(
      'required',
      'Прикрепите файл',
      (value) => value && value,
    )
    .test(
      'fileSize',
      'Файл не может превышать 2 мб',
      (value) => value && value?.size <= FILE_SIZE,
    )
    .test(
      'fileFormat',
      'Только с расширением PNG, JPG',
      (value) => value && SUPPORTED_FORMATS.includes(value?.type),
    ),
});

function Form() {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      select: '',
      textarea: '',
      file: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      document.getElementById('file').value = '';
      formik.resetForm();
      setShow(true);
    },
  });

  const handlerFile = (event) => {
    formik.setFieldValue('file', event.target.files[0]);
  };

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Typography variant="h5">Заполните форму</Typography>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <NameField formik={formik} />
          <SurnameField formik={formik} />
          <EmailField formik={formik} />
          <SelectField formik={formik} />
          <TextAreaField formik={formik} />
          <FileField formik={formik} handlerFile={handlerFile} />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Отправить
          </Button>
        </form>
      </Card>
      <ModalAccept show={show} setShow={setShow} />
    </Container>
  );
}
export {
  Form,
};
