export default function SubmitButtonComponent({ disabled = false }) {
  return (
    <button
      className={"form__submit-button"}
      name={"submit"}
      type={"submit"}
      disabled={disabled}
    >
      Отправить
    </button>
  );
}