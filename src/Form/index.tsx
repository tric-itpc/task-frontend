import React from "react";
import { Formik, Form } from "formik";

import FormField from "../components/FormField";
import { EMessageCategory } from "../types";
import styles from "./styles.module.css";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  category: EMessageCategory | null;
  message: string;
  image?: string;
}

const categories = [
  { value: EMessageCategory.First, label: "Первая" },
  { value: EMessageCategory.Second, label: "Вторая" },
  { value: EMessageCategory.Third, label: "Третья" },
];

const initialValues: IFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  category: null,
  message: "",
};

const MyForm: React.FC = () => {
  const onSubmit = (values: IFormValues) => {
    console.log(values);
  };

  return (
    <div className={styles.root}>
      <h2>Форма обратной связи</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <FormField label='Имя' name='firstName' type='text' />
          <FormField label='Фамилия' name='lastName' type='text' />
          <FormField label='E-mail' name='email' type='email' />
          <FormField label='Категория' name='category' component='select' options={categories} />
          <FormField label='Сообщение' name='message' component='textarea' />

          <button type='submit'>Отправить</button>
        </Form>
      </Formik>
    </div>
  );
};

export default MyForm;
