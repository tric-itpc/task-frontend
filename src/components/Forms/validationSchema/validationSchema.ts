import  * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    firstname: Yup.string().test(
            'has-value',
            'Имя или фамилия должно быть заполнено',
            function (value){
                return value || this.parent.lastname
            }
        ),
    lastname: Yup.string().test(
        'has-value',
        'Имя или фамилия должно быть заполнено',
        function (value){
            return value || this.parent.firstname
        }
    ),
    email: Yup.string().email('Не корретный адрес электронной почты').required('Поле обязательное для заполнения'),
    message: Yup.string().required('Поле обязательное для заполнения').min(10, 'Введите минимум 10 символов'), 
    category: Yup.string().required('Поле обязательное для заполнения').notOneOf(['']), 
})

