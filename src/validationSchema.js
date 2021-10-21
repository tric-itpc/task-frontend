import * as yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  categories: "",
  message: "",
  file: undefined,
};

const validation = yup.object().shape(
  {
    firstName: yup.string().when("lastName", {
      is: (txt) => !txt,
      then: yup.string().required("Обязательное поле"),
    }),
    lastName: yup.string().when("firstName", {
      is: (txt) => !txt,
      then: yup.string().required("Обязательное поле"),
    }),
    email: yup
      .string()
      .email("Введите верный email")
      .required("Обязательное поле"),
    categories: yup.string().required("Выберите категорию"),
    message: yup
      .string()
      .min(10, "Минимальное количество символов - 10")
      .required("Введите сообщение"),
    file: yup.array().of(
      yup
        .object()
        .shape({
          file: yup
            .mixed()
            .test("fileSize", "Размер файла превышает 2МБ", (value) => {
              if (!value) {
                return false;
              }
              return value.size < 2000000;
            })
            .required(),
          type: yup
            .string()
            .oneOf(
              ["image/jpeg", "image/png"],
              "Выберите верный формат jpg/png"
            ),
          name: yup.string().required(),
        })
        .typeError("Выберите файл")
    ),
  },
  ["firstName", "lastName"]
);

export { validation, initialValues };
