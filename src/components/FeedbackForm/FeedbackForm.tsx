import {Formik, Form} from "formik";
import MyTextInput from "../UI/MyTextInput/MyTextInput";
import MyTextArea from "../UI/MyTextArea/MyTextArea";
import MySelect from "../UI/MySelect/MySelect";
import {optionsForm} from "../UI/MySelect/options";
import MyFileInput from "../UI/MyFileInput/MyFileInput";
import {initialValues} from "./components/initialValues/initialValues";
import {validationSchema} from "./components/validationSchema/validationSchema";
import "./FeedbackForm.scss";

const FeedbackForm = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                console.log(JSON.stringify(values, null, 2));
                resetForm();
                let fileInput =
                    document.querySelector<HTMLInputElement>(
                        'input[type="file"]'
                    );
                if (fileInput) {
                    fileInput.value = "";
                }
            }}
        >
            {({setFieldValue}) => (
                <Form className="form">
                    <h2 className="form__title">Форма обратной связи</h2>
                    <MyTextInput label="Ваше имя" id="name" name="name" />
                    <MyTextInput
                        label="Ваша фамилия"
                        id="lastname"
                        name="lastname"
                    />
                    <MyTextInput label="Ваш email" id="email" name="email" />
                    <MyTextArea
                        label="Написать сообщение"
                        id="text"
                        name="text"
                    />
                    <MySelect
                        label="Выбрать категорию сообщения"
                        name="category"
                        id="category"
                        options={optionsForm}
                    />
                    <MyFileInput
                        setFieldValue={setFieldValue}
                        label={"Добавить картинку"}
                        name={"file"}
                        id={"file"}
                    />
                    <button className="form__btn-submit" type="submit">
                        Отправить
                    </button>
                </Form>
            )}
        </Formik>
    );
};
export default FeedbackForm;
