import { RootState } from "../store";

export const getInputFirstName = (state: RootState) =>
    state.form.firstNameField;
export const getInputSecondName = (state: RootState) =>
    state.form.secondNameField;
export const getInputEmail = (state: RootState) => state.form.emailField;
export const getCategory = (state: RootState) => state.form.category;
export const getMessage = (state: RootState) => state.form.messageField;
export const getImage = (state: RootState) => state.form.addImage;
export const getValidation = (state: RootState) => state.form.isValid;
