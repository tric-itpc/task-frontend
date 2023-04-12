export interface Feedback {
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  message: string;
  image: FileList;
}

/* 
email - обязательное поле
имя, фамилия - должно быть заполнено одно из двух
категория - выпадающий список. Поле обязательное, но значение по умолчанию должно быть пустым. Пустое значение не принимается
сообщение - обязательное, минимум 10 символов
картинка - формат jpg, png. Размер не более 2Мб
*/