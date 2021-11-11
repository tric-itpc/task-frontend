import React from "react";
import styles from "./styles.module.css";

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <button className={styles.root} {...props}>
      {children}
    </button>
  );
};

export default Button;
