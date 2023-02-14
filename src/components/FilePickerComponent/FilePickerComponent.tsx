import React from "react";

export default function FilePickerComponent({
  id,
  text,
  accept,
  onChange,
  showFileSizeError,
}: {
  id: string;
  text: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFileSizeError: boolean;
}) {
  return (
    <>
      <label className={"form__label"} htmlFor={id}>
        {text}
      </label>
      <input
        className={"form__image-input"}
        name={id}
        id={id}
        type={"file"}
        accept={accept}
        onChange={onChange}
      />
      {showFileSizeError && (
        <p className={"form__error-message"}>
          Файл больше 2MB. Пожалуйста, выберите файл меньшего размера
        </p>
      )}
    </>
  );
}