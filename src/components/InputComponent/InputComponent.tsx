import React from "react";

export default function InputComponent({
  id,
  text,
  required = false,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  text: string;
  required: boolean;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label className={"form__label"} htmlFor={id}>
        {text}
      </label>
      <input
        name={id}
        id={id}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        pattern={
          type === "email"
            ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
            : undefined
        }
        title={
          type === "email"
            ? "Введите email в формате: example@example.com"
            : undefined
        }
      />
    </>
  );
}