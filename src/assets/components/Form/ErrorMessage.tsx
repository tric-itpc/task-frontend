import { FC, ReactElement } from "react";

type PropsError = { text: string };

const ErrorMessage: FC<PropsError> = ({
    text,
}): ReactElement<HTMLDivElement> => {
    return <div className="form__error">{text}</div>;
};

export default ErrorMessage;
