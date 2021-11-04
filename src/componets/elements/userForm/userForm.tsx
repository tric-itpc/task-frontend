import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { InputGroup } from "../inputGroup/inputGroup";
import s from "./style.module.css";

interface IFormData {
  firstName: string;
  firstNameIsValid: boolean | undefined;
  lastName: string;
  lastNameIsValid: boolean | undefined;
  email: string;
  emailIsValid: boolean | undefined;
  messageType: string;
  messageTypeIsValid: boolean | undefined;
  message: string;
  messageIsValid: boolean | undefined;
  file: any;
  fileIsValid: boolean | undefined;
}

export const UserForm: FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    firstName: "",
    firstNameIsValid: undefined,
    lastName: "",
    lastNameIsValid: undefined,
    email: "",
    emailIsValid: undefined,
    messageType: "",
    messageTypeIsValid: undefined,
    message: "",
    messageIsValid: undefined,
    file: "",
    fileIsValid: undefined,
  });

  const setFirstName = (data: string, isValid: boolean | undefined) => {
    setFormData((prevState) => {
      if (isValid) {
        return {
          ...prevState,
          firstName: data,
          firstNameIsValid: isValid,
          lastNameIsValid: true,
        };
      } else {
        return { ...prevState, firstName: data, firstNameIsValid: isValid };
      }
    });
  };

  const setLastName = (data: string, isValid: boolean | undefined) => {
    setFormData((prevState) => {
      if (isValid) {
        return {
          ...prevState,
          lastName: data,
          lastNameIsValid: isValid,
          firstNameIsValid: true,
        };
      } else {
        return { ...prevState, lastName: data, lastNameIsValid: isValid };
      }
    });
  };

  const setEmail = (data: string, isValid: boolean | undefined) => {
    setFormData((prevState) => ({
      ...prevState,
      email: data,
      emailIsValid: isValid,
    }));
  };

  const setMessageType = (data: string, isValid: boolean | undefined) => {
    setFormData((prevState) => ({
      ...prevState,
      messageType: data,
      messageTypeIsValid: isValid,
    }));
  };

  const setMessage = (data: string, isValid: boolean | undefined) => {
    setFormData((prevState) => ({
      ...prevState,
      message: data,
      messageIsValid: isValid,
    }));
  };

  const setImage = (data: string, isValid: boolean | undefined) => {
    setFormData((prevState) => ({
      ...prevState,
      file: data,
      fileIsValid: isValid,
    }));
  };

  const [isNameEntered, setIsNameEntered] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    if (
      formData.firstNameIsValid === false ||
      formData.lastNameIsValid === false
    ) {
      setIsNameEntered(false);
    } else setIsNameEntered(true);
  }, [formData.firstNameIsValid, formData.lastNameIsValid]);

  const setInputsError = () => {
    if (formData.emailIsValid !== true) {
      setFormData((prevState) => ({
        ...prevState,
        emailIsValid: false,
      }));
    }
    if (formData.firstNameIsValid || formData.lastNameIsValid) {
      setIsNameEntered(true);
    } else setIsNameEntered(false);
    if (formData.messageTypeIsValid !== true) {
      setFormData((prevState) => ({
        ...prevState,
        messageTypeIsValid: false,
      }));
    }
    if (formData.messageIsValid !== true) {
      setFormData((prevState) => ({
        ...prevState,
        messageIsValid: false,
      }));
    }
    if (formData.fileIsValid !== true) {
      setFormData((prevState) => ({
        ...prevState,
        fileIsValid: false,
      }));
    }
  };

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      formData.emailIsValid &&
      formData.fileIsValid &&
      formData.messageIsValid &&
      formData.messageTypeIsValid &&
      isNameEntered
    ) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  }, [
    formData.emailIsValid,
    formData.fileIsValid,
    formData.messageIsValid,
    formData.messageTypeIsValid,
    isNameEntered,
  ]);

  const sendData = () => {
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      messageType: formData.messageType,
      message: formData.message,
      file: formData.file,
    };
    const jsonedData = JSON.stringify(data);
    console.log("jsonedData: ", jsonedData);
  };

  return (
    <form className={s.userForm} onSubmit={(e) => e.preventDefault()}>
      <InputGroup
        inputType="text"
        label="Имя*"
        errorMsg="Введите имя или фамилию с заглавной буквы"
        setData={setFirstName}
        isInputValid={isNameEntered}
      />
      <InputGroup
        inputType="text"
        label="Фамилия*"
        errorMsg="Введите имя или фамилию с заглавной буквы"
        setData={setLastName}
        isInputValid={isNameEntered}
      />
      <InputGroup
        inputType="email"
        label="E-mail*"
        errorMsg="Введите e-mail"
        setData={setEmail}
        isInputValid={formData.emailIsValid}
      />
      <InputGroup
        inputType="select"
        label="Выберите категорию*"
        errorMsg="Выберите категорию сообщения"
        setData={setMessageType}
        isInputValid={formData.messageTypeIsValid}
      />
      <InputGroup
        inputType="message"
        label="Сообщение*"
        errorMsg="Введите сообщение"
        setData={setMessage}
        isInputValid={formData.messageIsValid}
      />
      <InputGroup
        inputType="file"
        label="Изображение*"
        errorMsg="Добавьте картинку не более 2 Мб"
        setData={setImage}
        isInputValid={formData.fileIsValid}
      />
      {isFormValid ? (
        <button
          className={s.userForm__button}
          type="button"
          onClick={() => {
            console.log("form is valid");
            sendData();
          }}
        >
          Отправить
        </button>
      ) : (
        <button
          className={cn(s.userForm__button, s.userForm__buttonError)}
          type="button"
          onClick={() => {
            setInputsError();
          }}
        >
          Отправить
        </button>
      )}
    </form>
  );
};
