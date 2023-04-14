import React, { useState } from 'react';
import './App.css';
import FormInput from './components/FormInput';
import ImageInput from './components/ImageInput';
import SelectInput from './components/SelectInput';
import { validateFormFields } from './validation';

export default function App() {

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    message: "",
    image: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateFormFields(
      firstName,
      lastName,
      email,
      category,
      message,
      image,
    );
    
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors({
        email: "",
        firstName: "",
        lastName: "",
        category: "",
        message: "",
        image: "",
      });

      const JSONData = JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        category: category,
        message: message,
        image: image ? {imageName: image.name, imageSize: image.size}: "",
      })
    }
  }

  return (
    <main>
      <h2>Форма </h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          type={"text"}
          name={"firstName"}
          label={"Имя"} 
          onChange={ (event:any) => {setFirstName(event.target.value)} }
          error={errors.firstName ? errors.firstName : ''}
        />
        <FormInput
          type={"text"}
          name={"lastName"}
          label={"Фамилия"}
          onChange={ (event:any) => {setLastName(event.target.value)} }
          error={errors.lastName ? errors.lastName : ''}
        />
        <FormInput
          type={"email"}
          name={"email"} 
          label={"Почта*"}
          onChange={ (event:any) => {setEmail(event.target.value)} }
          error={errors.email ? errors.email : ''}
        />
        <SelectInput
          name={"select"}
          label={"Тип сообщения*"}
          value={category}
          onChange={ (event:any) => {setCategory(event.target.value)} }
          error={errors.category ? errors.category : ''}
        />
        <FormInput
          type={"text"}
          name={"message"}
          label={"Сообщение*"}
          onChange={ (event:any) => {setMessage(event.target.value)} }
          error={errors.message ? errors.message : ''}
        />
        <ImageInput
          type={"file"}
          name={"imageName"}
          accept={".jpg,.png,.jpeg"}
          label={"Файл"}
          onChange={ (event: any) =>
            event.target.files && event.target.files.length > 0
              ? setImage(event.target.files[0])
              : setImage(undefined)
          }
        />
        <button className='form--button item-mt'>отправить</button>
      </form>
    </main>
  )
}