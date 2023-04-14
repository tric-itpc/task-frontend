import {useField} from "formik";
import React from "react";

interface ISelect {
    label: string;
    name: string;
    id: string;
    options: {value: string; label: string; disabled?: boolean}[];
}

const MySelect: React.FC<ISelect> = ({label, options, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="form__wrapper">
            <label
                className="form__wrapper_label"
                htmlFor={props.id || props.name}
            >
                {label}
                <select className="form__wrapper_select" {...field} {...props}>
                    {options.map((option) => (
                        <option
                            value={option.value}
                            key={option.value}
                            disabled={option.disabled}
                        >
                            {option.label || option.value}
                        </option>
                    ))}
                </select>
            </label>
            {meta.touched && meta.error ? (
                <div className="form__wrapper_error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MySelect;
