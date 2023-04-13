import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    name: "FormSlice",
    initialState,
    reducers: {
        setFirstNameValue(state, { payload }: PayloadAction<string>) {
            state.firstNameField.value = payload;
        },
        setFirstNameDirty(state) {
            state.firstNameField.dirty = true;
        },
        setFirstNameErrorMessage(state, { payload }: PayloadAction<string>) {
            state.firstNameField.error = payload;
        },

        setSecondNameValue(state, { payload }: PayloadAction<string>) {
            state.secondNameField.value = payload;
        },
        setSecondNameDirty(state) {
            state.secondNameField.dirty = true;
        },
        setSecondNameErrorMessage(state, { payload }: PayloadAction<string>) {
            state.secondNameField.error = payload;
        },

        setEmailValue(state, { payload }: PayloadAction<string>) {
            state.emailField.value = payload;
        },
        setEmailDirty(state) {
            state.emailField.dirty = true;
        },
        setEmailErrorMessage(state, { payload }: PayloadAction<string>) {
            state.emailField.error = payload;
        },

        setCategoryValue(state, { payload }: PayloadAction<string>) {
            state.category.value = payload;
        },
        setCategoryDirty(state) {
            state.category.dirty = true;
        },
        setCategoryErrorMessage(state, { payload }: PayloadAction<string>) {
            state.category.error = payload;
        },

        setMessageValue(state, { payload }: PayloadAction<string>) {
            state.messageField.value = payload;
        },
        setMessageDirty(state) {
            state.messageField.dirty = true;
        },
        setMessageErrorMessage(state, { payload }: PayloadAction<string>) {
            state.messageField.error = payload;
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
    setEmailErrorMessage,
    setImageErrorMessage,
    setMessageErrorMessage,
    setSecondNameErrorMessage,
    setFirstNameErrorMessage,
    setCategoryErrorMessage,
    setImageName,
    setIsValid,
} = FormSlice.actions;
