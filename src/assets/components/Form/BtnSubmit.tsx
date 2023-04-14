import { FC, ReactElement } from "react";
import { useAppSelector } from "../../hooks/redux";
import { getValidation } from "../../redux/selectors/FormSelectors";

const enum classes {
    SUBMIT = "form__btn-submit",
    SUBMIT_DIS = "form__btn-submit form__btn-submit_disabled",
}

const BtnSubmit: FC = (): ReactElement<HTMLButtonElement> => {
    const isValid = useAppSelector(getValidation);

    return (
        <button
            className={isValid ? classes.SUBMIT : classes.SUBMIT_DIS}
            type="submit"
            title={
                !isValid
                    ? "Невозможно отправить. Форма не заполнена"
                    : "Нажмите, чтобы отправить форму"
            }
            disabled={!isValid}
        >
            Отправить обращение
        </button>
    );
};

export default BtnSubmit;
