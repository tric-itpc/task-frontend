import React, { useState } from "react";
import SubmitButtonComponent from "../SubmitButtonComponent/SubmitButtonComponent";
import InputComponent from "../InputComponent/InputComponent";
import SelectComponent from "../SelectComponent/SelectComponent";
import TextareaComponent from "../TextareaComponent/TextareaComponent";
import FilePickerComponent from "../FilePickerComponent/FilePickerComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import FormHeadlineComponent from "../FormHeadlineComponent/FormHeadlineComponent";

export enum FormState {
  Filling,
  Sending,
  Success,
  Error,
}

export default function Form() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [formState, setFormState] = useState<FormState>(FormState.Filling);
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setFormState(FormState.Sending);
    const data = {
      firstName: firstName ? firstName : "",
      lastName: lastName ? lastName : "",
      email: email ? email : "",
      category: category ? category : "",
      message: message ? message : "",
      image: image ? await fileToBase64(image) : "",
    };
    console.log(data);

    fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.ok
          ? setFormState(FormState.Success)
          : setFormState(FormState.Error);
      })
      .catch((error) => {
        console.log(error);
        setFormState(FormState.Error);
      });
  }

  return (
    <>
      <div className={"form-container"}>
        <FormHeadlineComponent formState={formState} />

        {formState === FormState.Filling && (
          <form className={"form"} onSubmit={handleSubmit}>
            <InputComponent
              id={"first-name"}
              text={`Имя${(!firstName && !lastName) || firstName ? "*" : ""}:`}
              required={(!firstName && !lastName) || !!firstName}
              type={"text"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <InputComponent
              id={"last-name"}
              text={`Фамилия${
                (!firstName && !lastName) || lastName ? "*" : ""
              }:`}
              required={(!firstName && !lastName) || !!lastName}
              type={"text"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <InputComponent
              id={"email"}
              text={"E-mail*:"}
              required={true}
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <SelectComponent
              id={"category"}
              text={"Категория*:"}
              required={true}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={{
                suggestion: "Пожелание",
                gratitude: "Благодарность",
                other: "Прочее",
              }}
            />

            <TextareaComponent
              id={"message"}
              text={"Сообщение* (10 символов минимум):"}
              required={true}
              minLength={10}
              onChange={(e) => setMessage(e.target.value)}
            />

            <FilePickerComponent
              id={"image"}
              text={"Изображение (2MB максимум):"}
              accept={".jpg,.png"}
              onChange={(e) =>
                e.target.files && e.target.files.length > 0
                  ? setImage(e.target.files[0])
                  : setImage(undefined)
              }
              showFileSizeError={!!image && !validateFileSize(image)}
            />

            <SubmitButtonComponent
              disabled={image && !validateFileSize(image)}
            />
          </form>
        )}

        {formState === FormState.Sending && <LoadingComponent />}
      </div>
    </>
  );
}

function validateFileSize(file: File) {
  const MAX_FILE_SIZE_KB = 2048; // 2MB
  const fileSizeKB = file.size / 1024;
  return fileSizeKB <= MAX_FILE_SIZE_KB;
}

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}