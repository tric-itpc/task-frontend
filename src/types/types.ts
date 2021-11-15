import { IUseInput } from '../hooks/useInput';

export enum InputNames {
  name = 'name',
  lastname = 'lastname',
  email = 'email',
  message = 'message',
  select = 'select',
}

export interface IInputData {
  name: InputNames;
  label: string;
  required: boolean;
  props: IUseInput;
}

export type InputsData = {
  [ key in keyof typeof InputNames ]: IInputData;
};

export interface IFormData {
  name: string | null,
  lastname: string | null,
  email: string,
  message: string,
  messageType: string,
  image: string | null,
}
