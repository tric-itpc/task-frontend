import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    name: Yup.string().test(
        "has-value",
        "Введите имя или фамилию",
        function (value) {
            return value || this.parent.lastname;
        }
    ),
    lastname: Yup.string().test(
        "has-value",
        "Введите имя или фамилию",
        function (value) {
            return value || this.parent.name;
        }
    ),
    email: Yup.string()
        .email("Неправильный email адрес")
        .required("Обязательное поле!"),
    category: Yup.string().required("Выберите категорию").notOneOf([""]),
    text: Yup.string()
        .min(10, "Не менее 10 символов")
        .required("Обязательное поле!"),
    file: Yup.mixed()
        .required("Файл обязателен для загрузки")
        .test(
            "fileSize",
            "Прикрепите файл меньше 2МБ",
            (value) => value && (value as File).size <= 1024 * 1024 * 2
        )
        .test(
            "fileFormat",
            "Поддерживаемые форматы: png, jpeg, jpg",
            (value) =>
                value &&
                ["image/png", "image/jpeg", "image/jpg"].includes(
                    (value as File).type
                )
        ),
});
