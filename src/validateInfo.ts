import { Values, Errors, TypeFiles } from './types';

const TWO_MB_IN_BITES = 2000000
export default function validateInfo(values: Values) {
    let errors: Errors = {};

    if (!values.name.trim() && !values.secondName.trim()) {
        errors.person = 'Имя или Фамилия обязательны к заполнению';
    }
    if (!values.email) {
        errors.email = 'Электронная почта обязательна к заполнению';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Невалидный адрес электронной почты';
    }
    if(!values.title.trim()){
        errors.title = 'Выберете заголовок сообщения'
    }
    if (!values.text) {
        errors.text = 'Сообщение обязательно';
    } else if (values.text.length < 10) {
        errors.text = 'Сообщение должно содержать больше 10 символов';
    }
    if(!Object.values(TypeFiles).includes(values.file.type)){
        errors.file = 'Недопустимое расширение файла. Допустимые: jpg и png'
    }
    if(values.file.size > TWO_MB_IN_BITES){
        errors.file = 'Картинка превышает допустимый размер'
    }

    return errors;
}