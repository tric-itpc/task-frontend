import {useField} from "formik";
import React from "react";

interface IInput {
    label: string;
    name: string;
    id: string;
}

const MyTextInput: React.FC<IInput> = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className="form__wrapper">
            <label className="form__wrapper_label">
                {label}
                <input
                    className="form__wrapper_input-text"
                    type="text"
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

export default MyTextInput;
