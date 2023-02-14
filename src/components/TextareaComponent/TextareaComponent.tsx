import React from "react";

export default function TextareaComponent({
  id,
  text,
  required = true,
  minLength,
  onChange,
}: {
  id: string;
  text: string;
  required: boolean;
  minLength: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <>
      <label className={"form__label"} htmlFor={id}>
        {text}
      </label>
      <textarea
        className={"form__label__textarea"}
        name={id}
        id={id}
        required={required}
        minLength={minLength}
        onChange={onChange}
      ></textarea>
    </>
  );
}