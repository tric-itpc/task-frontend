import React from "react";
import { Field, FieldConfig } from "formik";

import ErrorMessage from "../ErrorMessage";
import { EMessageCategory } from "../../types";
import styles from "./styles.module.css";

interface IProps extends FieldConfig {
  label: string;
  name: string;
  options?: { label: string; value?: EMessageCategory }[];
}

const FormField: React.FC<IProps> = ({ label, name, options, ...other }) => {
  return (
    <div className={styles.field}>
      <label className={styles.field__label} htmlFor={name}>
        {label}:
      </label>
      <Field id={name} name={name} className={styles.field__input} {...other}>
        {options &&
          options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default FormField;
