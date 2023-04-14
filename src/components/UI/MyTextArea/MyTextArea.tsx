import {useField} from "formik";
import React from "react";

interface ITextArea {
    label: string;
    name: string;
    id: string;
}

const MyTextArea: React.FC<ITextArea> = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="form__wrapper">
            <label className="form__wrapper_label">
                {label}
                <textarea
                    className="form__wrapper_text-area"
                    {...field}
                    {...props}
                />
            </label>
            {meta.touched && meta.error ? (
                <div className="form__wrapper_error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MyTextArea;
