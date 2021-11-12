import React, {useState} from 'react'

import { IFormInput } from '../../types/type';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../utils/FormValidate';

const Form: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')


    const { register, handleSubmit, reset, formState: {errors} } = useForm<IFormInput>({
        mode: "onSubmit",
        resolver: yupResolver(formSchema)
    })

    const onSubmit = (data: IFormInput) => {
        if (firstName.length === 0 && !lastName && lastName.length === 0) {
            setError('Пожалуйста заполните одно поле')
        } else {
            setError('')
            alert(JSON.stringify(data));
            console.log(data)
            reset()
        }
        
    }

    const fileHandle = (e: any) => {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    return (
        <div className='form'>
            <h2 className="form__title">
                Form Task
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form__inputBox">
                    <input 
                    type="text" 
                    placeholder={'Введите имя'} 
                    {...register("firstName")}
                    
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span>Имя</span>
                    <p>{error}</p>
                </div>
                <div className="form__inputBox">
                    <input 
                    type="text" 
                    placeholder={'Введите фамилию'} 
                    {...register("lastName")}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                    <span>Фамилия</span>
                    <p>{error}</p>
                </div>
                <div className="form__inputBox">
                    <input type="text" placeholder={'Введите email'} {...register("email")}/>
                    <span>Email</span>
                    <p>{errors.email?.message}</p>
                </div>
                <div className="form__inputBox">
                    <select {...register("categoryMessage")}>
                    <option value="">Категория сообщений</option>
                    <option>Пустое значение</option>
                    </select>
                    <p>{errors.categoryMessage?.message}</p>
                </div>


                <div className="form__inputBox" >
                    <input type="text" placeholder={'Введите сообщение'} {...register("message")}/>
                    <span>Сообщение</span>
                    <p>{errors.message?.message}</p>
                </div>
                <div className="form__inputBox" >
                    <input 
                    type='file' 
                    {...register("image")}
                    
                    onChange={fileHandle}
                    />
                    <p>{errors.image?.message}</p>
                </div>
                <div className="form__inputBox">
                    <input type='submit' value='Отправить сообщение'/>
                </div>
            </form>
        </div>
    )
}

export default Form


