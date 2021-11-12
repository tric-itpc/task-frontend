import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import FormField from "../components/FormField";
import FileUploadInput from "../components/FileUploadInput";
import { EMessageCategory } from "../types";
import styles from "./styles.module.css";
import Button from "../components/Button";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  category?: EMessageCategory;
  message: string;
  image?: File | Blob | string;
}

const categories = [
  { label: "" },
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
    image: Yup.mixed()
      .test("fileType", "Данный формат не разрешен. Загрузите *.jpg или *.png.", (file) => {
        return !file || ["image/jpeg", "image/png"].includes(file.type);
      })
      .test("fileSize", "Размер файла превышает допустимые 2МБ.", (file) => {
        return !file || file.size <= 2 * 1024 * 1024;
      }),
  },
  [["firstName", "lastName"]]
);

const initialValues: IFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  category: undefined,
  message: "",
  image: undefined,
};

const MyForm: React.FC = () => {
  const getFileURL = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.readAsDataURL(blob as Blob);
    });
  };

  const onSubmit = async (values: IFormValues) => {
    const data = { ...values };

    if (data.image) {
      data.image = await getFileURL(data.image as Blob);
    }
    console.dir(data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className={styles.form}>
      <h2>Форма обратной связи</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isValid, dirty }) => (
          <Form>
            <FormField label='Имя' name='firstName' type='text' />
            <FormField label='Фамилия' name='lastName' type='text' />
            <FormField label='E-mail' name='email' type='email' />
            <FormField label='Категория' name='category' component='select' options={categories} />
            <FormField label='Сообщение' name='message' component='textarea' />
            <Field name='image' component={FileUploadInput} accept='.jpg, .png' />

            <Button disabled={!(isValid && dirty)} type='submit'>
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;
