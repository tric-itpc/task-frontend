import React from "react";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";

function App() {
  let data = null;
  const getError = (touched, error) => {
    return (
      touched &&
      error && (
        <p key={error} className={"error"}>
          {error}
        </p>
      )
    );
  };

  const validation = yup.object().shape(
    {
      firstName: yup.string().when("lastName", {
        is: (txt) => !txt,
        then: yup.string().required("Обязательное поле"),
      }),
      lastName: yup.string().when("firstName", {
        is: (txt) => !txt,
        then: yup.string().required("Обязательное поле"),
      }),
      email: yup
        .string()
        .email("Введите верный email")
        .required("Обязательное поле"),
      categories: yup.string().required("Выберите категорию"),
      message: yup
        .string()
        .min(10, "Минимальное количество символов - 10")
        .required("Введите сообщение"),
      file: yup.array().of(
        yup
          .object()
          .shape({
            file: yup
              .mixed()
              .test("fileSize", "Размер файла превышает 2МБ", (value) => {
                if (!value) {
                  return false;
                }
                return value.size < 2000000;
              })
              .required(),
            type: yup
              .string()
              .oneOf(
                ["image/jpeg", "image/png"],
                "Выберите верный формат jpg/png"
              ),
            name: yup.string().required(),
          })
          .typeError("Выберите файл")
      ),
    },
    ["firstName", "lastName"]
  );

  const getFileSchema = (file) =>
    file && {
      file: file,
      type: file.type,
      name: file.name,
    };

  const getArrErrorsMessage = (errors) => {
    const result = [];
    errors &&
      Array.isArray(errors) &&
      errors.forEach((value) => {
        if (typeof value === "string") {
          result.push(value);
        } else {
          Object.values(value).forEach((error) => {
            result.push(error);
          });
        }
      });
    return result;
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header__title">
            <h1 className="header__title-text">Форма обратной связи</h1>
          </div>
        </div>
      </header>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          categories: "",
          message: "",
          file: undefined,
        }}
        validateOnBlur
        onSubmit={(values) => {
          data = JSON.stringify(values);
        }}
        validationSchema={validation}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className="form">
            <section className="form__info">
              <div className="container">
                <form className="form__info-list" action="">
                  <label htmlFor="firstName">Введите имя</label>
                  <input
                    className="form__info-input"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <p>
                    {touched.firstName && errors.firstName && (
                      <p className="error">{errors.firstName}</p>
                    )}
                  </p>
                  <label htmlFor="lastName">Введите фамилию</label>
                  <input
                    className="form__info-input"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                  )}
                  <label htmlFor="email">Введите email</label>
                  <input
                    className="form__info-input"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                  )}
                  <label htmlFor="categories">
                    Ввыберите категорию сообщения
                  </label>
                  <select
                    className="form__info-input"
                    name="categories"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.categories}
                  >
                    <option
                      className="form__info-input_option"
                      selected
                      disabled
                    >
                      {" "}
                    </option>
                    <option>Жалоба</option>
                    <option>Отзыв</option>
                    <option>Улучшить продукт</option>
                  </select>
                  {touched.categories && errors.categories && (
                    <p className="error">{errors.categories}</p>
                  )}
                  <label htmlFor="message">Введите сообщение</label>
                  <textarea
                    className="form__info-input form__info-textarea"
                    type="text"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  />
                  {touched.message && errors.message && (
                    <p className="error">{errors.message}</p>
                  )}
                  <FieldArray name="file">
                    {(arrayHelper) => (
                      <>
                        <input
                          className="form__info-input form__info-input__hide"
                          type="file"
                          name="file"
                          id="upload"
                          onChange={(e) => {
                            const { files } = e.target;
                            const file = getFileSchema(files.item(0));
                            if (!file) {
                              arrayHelper.remove(0);
                            }
                            if (Array.isArray(values.file)) {
                              arrayHelper.replace(0, file);
                            } else {
                              arrayHelper.push(file);
                            }
                          }}
                        />
                        <label className="label__upload-img" for="upload">
                          {!values.file
                            ? "Загрузить фото"
                            : values.file[0].name}
                        </label>

                        {getArrErrorsMessage(errors.file).map((error) =>
                          getError(true, error)
                        )}
                      </>
                    )}
                  </FieldArray>
                  {touched.file && errors.file && (
                    <p className="error">{errors.file}</p>
                  )}
                  <button
                    type={"submit"}
                    disabled={!isValid && !dirty && errors}
                    onClick={handleSubmit}
                    className="form__info-btn"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            </section>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default App;
