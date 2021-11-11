import React from "react";
import classNames from "classnames";

import styles from "./styles.module.css";

interface IProps {
  label: string;
  name: string;
  helperText?: string;
}

const FormField: React.FC<IProps> = ({ label, name, helperText }) => {
  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor={name}>
        {label}:
      </label>
      <input className={classNames({ [styles.input]: true, [styles.danger]: !!helperText })} id={name} />
      <span className={styles.helperText}>{helperText}</span>
    </div>
  );
};

export default FormField;
