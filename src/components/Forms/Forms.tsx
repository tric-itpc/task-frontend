import { Formik, Form, ErrorMessage, Field } from "formik"
import { validationSchema } from "./validationSchema/validationSchema"
import React, { useState } from "react"
import { checkSizeFiles, initialValues } from "../../utils/utils"
import { FormikType } from "../../types/types"

export const Forms: React.FC = () => {
    const [error, setError] = useState<string>('')
    const [isError, setisError] = useState<boolean>(false)

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>, formik: FormikType) => {
        const files: File = e.target.files![0]

        const reader = new FileReader()
        reader.readAsDataURL(files)

        const filesBase = await new Promise((res) => {
            reader.onload = async function () {
                const dataUrl = reader.result;
                const data = {
                    name: files.name,
                    dataUrl
                }
                res(data)
            }
        })

        if (checkSizeFiles(files)) {
            setError('')
            setisError(true)
            formik.setFieldValue('pictures', filesBase)
        } else {
            setError('Не должно превышать 2Mb')
            setisError(false)
        } 
    }

    return (
        <Formik
            initialValues = {initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                console.log(values)
                console.log(JSON.stringify(values))
                resetForm()
            }}
        >
            {(formik) => (
                <Form className="form">
                    <div className="form__input_container">
                        <Field className='form__input' name="firstname" placeholder="Имя" id="firstname" autoComplete="off" />
                        <ErrorMessage className="form__error_message" component="span" name="firstname" />
                    </div>

                    <div className="form__input_container">
                        <Field className='form__input' name="lastname" placeholder="Фамилия" id="lastname" autoComplete="off" />
                        <ErrorMessage className="form__error_message" component="span" name="lastname" />
                    </div>

                    <div className="form__input_container">
                        <Field className='form__input' type='email' name="email" placeholder="Email" id="email" autoComplete="off" />
                        <ErrorMessage className="form__error_message" component="span" name="email" />
                    </div>

                    <div className="form__textarea_container">
                        <Field as="textarea" className='form__textarea' name="message" placeholder="Сообщение" id="message" autoComplete="off" />
                        <ErrorMessage className="form__error_message" component="span" name="message" />
                    </div>

                    <div className="form__input_container">
                        <Field as="select" className='form__selected' name="category" >
                            <option value="" disabled>Выберите категорию сообщения</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Field>
                        <ErrorMessage className="form__error_message" component="span" name="category" />
                    </div>
 
                    <div className="form__input_add_files_container">
                        <input type='file' name="file" accept=".jpeg, .png" onChange = {(e) => changeHandler(e, formik)} className="form_input_add_file"/>
                        <span className="form__error_message">{error}</span>
                    </div>

                    <button disabled={!(formik.isValid && formik.dirty && isError)} type="submit" className="form__button">Submit</button>
                </Form>
            )}
        </Formik>
    )
}
