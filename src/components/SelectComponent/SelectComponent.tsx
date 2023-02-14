import React from "react";

export default function SelectComponent({
  id,
  text,
  required = true,
  value,
  onChange,
  options,
}: {
  id: string;
  text: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { [key: string]: string };
}) {
  return (
    <>
      <label className={"form__label"} htmlFor={id}>
        {text}
      </label>
      <select
        name={id}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
      >
        <option value={""} disabled={true} hidden={true}>
          -- Выберите категорию --
        </option>
        {Object.keys(options).map((key) => {
          return (
            <option value={key} key={key}>
              {options[key]}
            </option>
          );
        })}
      </select>
    </>
  );
}
