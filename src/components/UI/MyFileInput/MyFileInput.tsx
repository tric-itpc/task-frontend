import React from "react";
import {useField} from "formik";

interface IFileInput {
    label: string;
    name: string;
    id: string;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => void;
}

const MyFileInput: React.FC<IFileInput> = ({
    setFieldValue,
    label,
    ...props
}) => {
    const [field, meta] = useField(props);
    return (
        <div className="form__wrapper">
            <label className="form__wrapper_label">
                {label}
                <input
                    className="form__wrapper_input-file"
                    type="file"
                    onChange={(event) => {
                        setFieldValue(
                            "file",
                            {
                                name: event.currentTarget.files?.[0].name,
                                size: event.currentTarget.files?.[0].size,
                                type: event.currentTarget.files?.[0].type,
                            } || null
                        );
                    }}
                />
            </label>
            {meta.touched && meta.error ? (
                <div className="form__wrapper_error">{meta.error}</div>
            ) : null}
        </div>
    );
};
export default MyFileInput;
