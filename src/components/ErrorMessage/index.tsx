import React from "react";
import { ErrorMessage as FormilErrorMessage } from "formik";

import styles from "./styles.module.css";

interface IProps {
  name: string;
}

const ErrorMessage: React.FC<IProps> = ({ name }) => {
  return <FormilErrorMessage className={styles.errorMessage} name={name} component='div' />;
};

export default ErrorMessage;
