import React from "react";
import { FormState } from "../FormComponent/Form";

export default function FormHeadlineComponent({
  formState,
}: {
  formState: FormState;
}) {
  return (
    <>
      <h1 className={"form-container__headline"}>
        Форма обратной связи
        {formState === FormState.Sending && " отправляется..."}
        {formState === FormState.Success && " отправлена успешно"}
        {formState === FormState.Error && " не была отправлена"}
      </h1>
      {formState === FormState.Error && (
        <p className={"form-container__error-message"}>
          Произошла ошибка. Пожалуйста, попробуйте позже
        </p>
      )}
    </>
  );
}