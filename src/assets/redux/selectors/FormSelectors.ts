import { RootState } from "../store";

export const getInputFirstName = (state: RootState) =>
    state.FormSlice.firstNameField;
export const getInputSecondName = (state: RootState) =>
    state.FormSlice.secondNameField;
export const getInputEmail = (state: RootState) => state.FormSlice.emailField;
export const getCategory = (state: RootState) => state.FormSlice.category;
export const getMessage = (state: RootState) => state.FormSlice.messageField;
export const getImage = (state: RootState) => state.FormSlice.addImage;
export const getValidation = (state: RootState) => state.FormSlice.isValid;
