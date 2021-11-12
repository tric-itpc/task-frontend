import * as yup from 'yup'

const IMG_SIZE = 2097152
const IMG_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

export const formSchema = yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email('Неправильно ввели email').required('Обязательное поле'),
    categoryMessage: yup.string(),
    message: yup.string().min(10, 'Введите более 10 символов').required(),
    image: yup
    .mixed()
    .notRequired()
    .test('imageSize', 'Изображение не должно превывать 2mb', (value) => {
        
        if (value.length !== 0) {
            return value && value[0].size <= IMG_SIZE
        } else {
            return true
        }
    })
    .test('imgFormat', 'Формат файла должен быть .jpg .jpeg .png', (value) => {
        if (value.length !== 0) {
            return value && IMG_FORMATS.includes(value[0].type)
        } else {
            return true
        }
    })
}).required();