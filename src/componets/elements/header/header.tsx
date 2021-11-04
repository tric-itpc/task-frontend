import { FC } from "react";
import s from "./style.module.css";

export const Header: FC = () => {
  return (
    <header className={s.header}>
      <h1>Тестовое задание</h1>
    </header>
  );
};
