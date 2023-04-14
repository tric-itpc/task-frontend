import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const nameRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;
const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface InputType {
    value: string;
    dirty: boolean;
    error: string;
}

interface InputFileType {
    value: string;
    name: string;
    dirty: boolean;
    error: string;
}

interface IForms {
    firstNameField: InputType;
    secondNameField: InputType;
    emailField: InputType;
    category: InputType;
    messageField: InputType;
    addImage: InputFileType;
    isValid: boolean;
}

const initialState: IForms = {
    firstNameField: {
        value: "",
        dirty: false,
        error: "",
    },
    secondNameField: {
        value: "",
        dirty: false,
        error: "",
    },
    emailField: {
        value: "",
        dirty: false,
        error: "",
    },
    category: {
        value: "empty",
        dirty: false,
        error: "",
    },
    messageField: {
        value: "",
        dirty: false,
        error: "",
    },
    addImage: {
        value: "",
        name: "",
        dirty: false,
        error: "",
    },
    isValid: false,
};

export const FormSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setFirstNameValue(state, { payload }: PayloadAction<string>) {
            state.firstNameField.value = payload;
            if (!payload) {
                state.firstNameField.error = "Поле должно быть заполнено!";
                return;
            }
            if (!payload.toLowerCase().match(nameRegExp)) {
                state.firstNameField.error = "Имя не должно содержать чисел!";
                return;
            }
            state.firstNameField.error = "";
        },
        setFirstNameDirty(state) {
            state.firstNameField.dirty = true;
        },

        setSecondNameValue(state, { payload }: PayloadAction<string>) {
            state.secondNameField.value = payload;

            if (!payload) {
                state.secondNameField.error = "";
                return;
            }
            if (!payload.toLowerCase().match(nameRegExp)) {
                state.secondNameField.error =
                    "Фамилия не должна содержать чисел";
                return;
            }
            state.secondNameField.error = "";
        },
        setSecondNameDirty(state) {
            state.secondNameField.dirty = true;
        },

        setEmailValue(state, { payload }: PayloadAction<string>) {
            state.emailField.value = payload;

            if (!payload) {
                state.emailField.error = "Поле должно быть заполнено!";
                return;
            }
            if (!payload.toLowerCase().match(emailRegExp)) {
                state.emailField.error = "Email введён не корректно!";
                return;
            }
            state.emailField.error = "";
        },
        setEmailDirty(state) {
            state.emailField.dirty = true;
        },

        setCategoryValue(state, { payload }: PayloadAction<string>) {
            state.category.value = payload;
            if (payload === "empty") {
                state.category.error = "Выберите тип обращения!";
                return;
            }
            state.category.error = "";
        },
        setCategoryDirty(state) {
            state.category.dirty = true;
        },

        setMessageValue(state, { payload }: PayloadAction<string>) {
            state.messageField.value = payload;
            if (!payload) {
                state.messageField.error = "Поле должно быть заполнено!";
                return;
            }
            if (payload.length < 10) {
                state.messageField.error = "Сообщение не менее 10 символов!";
                return;
            }
            state.messageField.error = "";
        },
        setMessageDirty(state) {
            state.messageField.dirty = true;
        },

        setImageValue(state, { payload }: PayloadAction<string>) {
            state.addImage.value = payload;
        },
        setImageName(state, { payload }: PayloadAction<string>) {
            state.addImage.name = payload;
        },
        setImageDirty(state) {
            state.addImage.dirty = true;
        },
        setImageErrorMessage(state, { payload }: PayloadAction<string>) {
            state.addImage.error = payload;
        },

        setIsValid(state, { payload }: PayloadAction<boolean>) {
            state.isValid = payload;
        },

        setClearForm(state) {
            state.firstNameField.value = "";
            state.secondNameField.value = "";
            state.emailField.value = "";
            state.category.value = "empty";
            state.messageField.value = "";
            state.addImage.value = "";
            state.addImage.name = "";
        },
    },
});

export default FormSlice.reducer;
export const {
    setFirstNameDirty,
    setSecondNameDirty,
    setEmailDirty,
    setMessageDirty,
    setCategoryDirty,
    setFirstNameValue,
    setSecondNameValue,
    setEmailValue,
    setMessageValue,
    setCategoryValue,
    setImageDirty,
    setImageValue,
    setImageErrorMessage,
    setImageName,
    setIsValid,
    setClearForm,
} = FormSlice.actions;
