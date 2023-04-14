export const validateFormFields = (
  firstName: string,
  lastName: string,
  email: string,
  category: string,
  message: string,
  image: any,
) => {
  const errors:any = {};
  const messageRequired = "Обязательное поле";
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!firstName && !lastName) {
    errors.firstName = "Необходимо заполнить хотя бы одно поле";
    errors.lastName = "Необходимо заполнить хотя бы одно поле";
  }

  if (!email) {
    errors.email = messageRequired;
  }else if (!email.toLowerCase().match(emailRegex)) {
    errors.email = "почта введена неверно"
  }

  if(!category) {
    errors.category = messageRequired;
  }

  if (!message || message.length < 10) {
    errors.message = "Необходимо не менее 10 символов";
  }

  if(image) {
    const ReqFileSize = 2048;
    const fileSizeKB = image.size / 1024;

    if(fileSizeKB >= ReqFileSize) {
      errors.image = "Размер файла больше 2мб"
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}