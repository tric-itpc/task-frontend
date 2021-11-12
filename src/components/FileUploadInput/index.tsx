import React from "react";
import { FieldProps } from "formik";

import ErrorMessage from "../ErrorMessage";
import styles from "./styles.module.css";

const FileUploadInput: React.FC<FieldProps> = ({ field, form, ...inputProps }) => {
  const onFileUploadHandler = (event: React.ChangeEvent) => {
    const { files } = event.target as HTMLInputElement & EventTarget;
    if (files && files.length) {
      form.setFieldValue(field.name, files[0]);
    }
  };

  return (
    <div>
      <label htmlFor={field.name}>
        <input
          id={field.name}
          type='file'
          onChange={onFileUploadHandler}
          name={field.name}
          className={styles.fileUpload__input}
          {...inputProps}
        />
        <div>
          <div role='button' tabIndex={0} className={styles.fileUpload__button}>
            + добавить картинку
          </div>
          <span className={styles.fileUpload__fileName}>{field.value?.name}</span>
        </div>
      </label>
      <ErrorMessage name={field.name} message={form.errors[field.name]} />
    </div>
  );
};

export default FileUploadInput;
