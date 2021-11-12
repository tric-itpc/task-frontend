import React from "react";
import { Field, FieldConfig } from "formik";

import ErrorMessage from "../ErrorMessage";
import { EMessageCategory } from "../../types";
import styles from "./styles.module.css";

interface IProps extends FieldConfig {
  label: string;
  name: string;
  options?: { label: string; value: EMessageCategory }[];
}

const FormField: React.FC<IProps> = ({ label, name, options, ...other }) => {
  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor={name}>
        {label}:
      </label>
      <Field id={name} name={name} className={styles.field} {...other}>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default FormField;
