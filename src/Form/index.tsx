import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormField from "../components/FormField";
import { EMessageCategory } from "../types";
import styles from "./styles.module.css";
import Button from "../components/Button";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  category: EMessageCategory | "";
  message: string;
  image?: string;
}

const categories = [
  { value: EMessageCategory.First, label: "Первая" },
  { value: EMessageCategory.Second, label: "Вторая" },
  { value: EMessageCategory.Third, label: "Третья" },
];

Yup.setLocale({
  mixed: {
    required: "Обязательное поле.",
  },
});

const validationSchema = Yup.object().shape(
  {
    firstName: Yup.string().when("lastName", {
      is: (value: string) => !value,
      then: Yup.string().required("Введите имя и/или фамилию."),
      otherwise: Yup.string(),
    }),
    lastName: Yup.string().when("firstName", {
      is: (value: string) => !value,
      then: Yup.string().required("Введите имя и/или фамилию."),
      otherwise: Yup.string(),
    }),
    email: Yup.string().email("Введите валидный email.").required(),
    category: Yup.string().required(),
    message: Yup.string().min(10, "Минимум 10 символов.").required(),
  },
  // noSortEdges?: Array<[string, string]>
  [["firstName", "lastName"]]
);

const initialValues: IFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  category: "",
  message: "",
};

const MyForm: React.FC = () => {
  const onSubmit = (values: IFormValues) => {
    console.dir(values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className={styles.root}>
      <h2>Форма обратной связи</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isValid, dirty }) => (
          <Form>
            <FormField label='Имя' name='firstName' type='text' />
            <FormField label='Фамилия' name='lastName' type='text' />
            <FormField label='E-mail' name='email' type='email' />
            <FormField label='Категория' name='category' component='select' options={categories} />
            <FormField label='Сообщение' name='message' component='textarea' />

            <Button disabled={!(isValid || dirty)} type='submit'>
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;
