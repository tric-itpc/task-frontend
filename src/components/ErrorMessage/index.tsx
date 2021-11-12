import React from "react";
import { ErrorMessage as FormilErrorMessage, FormikErrors } from "formik";

import styles from "./styles.module.css";

interface IProps {
  name: string;
  message?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
}

const ErrorMessage: React.FC<IProps> = ({ name, message }) => {
  if (message) {
    return <div className={styles.errorMessage}>{message}</div>;
  } else {
    return <FormilErrorMessage className={styles.errorMessage} name={name} component='div' />;
  }
};

export default ErrorMessage;
