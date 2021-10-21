import React from "react";
import { Formik, FieldArray } from "formik";
import { validation, initialValues } from "./validationSchema";
import UploadImage from "./uploadImage";
import DropDownList from "./ DropDownList";
import Header from "./Header";
function App() {
  let data = null;

  return (
    <div>
      <Header />
      <Formik
        initialValues={initialValues}
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
                  <DropDownList
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values}
                  />
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
                  <UploadImage values={values} errors={errors} />
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
