import { FC, useEffect, useState } from "react";
import {
  validateEmail,
  validateFileSize,
  validateMsg,
  validateName,
} from "../../app/validate";
import s from "./style.module.css";
import cn from "classnames";

interface InputGroupProps {
  inputType: "text" | "email" | "file" | "select" | "message";
  label: string;
  errorMsg: string;
  isInputValid: boolean | undefined;
  setData: (arg0: string, arg1: boolean | undefined) => void;
}

export const InputGroup: FC<InputGroupProps> = ({
  inputType,
  label,
  errorMsg,
  setData,
  isInputValid,
}) => {
  const [isValid, setIsValid] = useState<boolean | undefined>(isInputValid);
  const [value, setValue] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();

  useEffect(() => {
    setIsValid(isInputValid);
  }, [isInputValid]);

  useEffect(() => {
    if (inputType === "file" && file) setIsValid(validateFileSize(file));
  }, [file, inputType]);

  return (
    <div className={cn(s.inputGroup, { [s.notValid]: isValid === false })}>
      <label className={s.inputGroup__label}>{label}</label>
      {inputType !== "select" &&
        inputType !== "message" &&
        inputType !== "file" && (
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (inputType === "text")
                setIsValid(validateName(e.target.value));
              if (inputType === "email")
                setIsValid(validateEmail(e.target.value));
            }}
            type={inputType}
            className={s.inputGroup__input}
            onBlur={() => {
              setData(value, isValid);
            }}
          />
        )}
      {inputType === "file" && (
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => {
            const newFile = e.target.files ? e.target.files[0] : undefined;
            setFile(newFile);
          }}
          onBlur={() => {
            if (file) setData(file.name, isValid);
          }}
        />
      )}
      {inputType === "select" && (
        <select
          className={s.inputGroup__select}
          value={value}
          onChange={(e) => {
            const targetVal = e.target.value;
            setValue(targetVal);
            if (targetVal.length < 1) {
              setIsValid(false);
            } else setIsValid(true);
          }}
          onBlur={() => {
            setData(value, isValid);
          }}
        >
          <option value="" disabled>
            Выберите
          </option>
          <option value="question">Вопрос</option>
          <option value="complaint">Жалоба</option>
        </select>
      )}
      {inputType === "message" && (
        <textarea
          className={s.inputGroup__message}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsValid(validateMsg(e.target.value));
          }}
          onBlur={() => {
            setData(value, isValid);
          }}
        ></textarea>
      )}
      <div className={s.inputGroup__error}>{errorMsg}</div>
    </div>
  );
};
