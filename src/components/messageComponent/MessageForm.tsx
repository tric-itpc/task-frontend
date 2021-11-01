import './../../css/style.css'
import {useState} from 'react'

function MessageForm() {

    const [firstName, setFirstName] = useState('');
    const [firstNameDirty, setFirstNameDirty] = useState(false);
    const [firstNameError, setFirstNameError] = useState('Одно из полей должно быть заполнено')

    const [secondName, setSecondName] = useState('');
    const [secondNameDirty, setSecondNameDirty] = useState(false);
    const [secondNameError, setSecondNameError] = useState('Одно из полей должно быть заполнено')

    const [isNameChoosen, setIsNameChoosen] = useState(false);

    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('Поле email не может быть пустым')

    const [category, setCategory] = useState('');
    const [categoryDirty, setCategoryDirty] = useState(false);
    const [categoryError, setCategoryError] = useState('Поле категории не может быть пустым')

    const [message, setMessage] = useState('');
    const [messageDirty, setMessageDirty] = useState(false);
    const [messageError, setMessageError] = useState('Поле сообщения должно содержать минимум 10 символов')

    const [image, setImage] = useState('');

    const firstNameHandler = (e: React.FormEvent<HTMLInputElement>, first_class_name: string, second_class_name: string): void => {
        setFirstName(e.currentTarget.value)
        if (e.currentTarget.value.length < 1 && (document.getElementById('secondName') as HTMLInputElement).value === '') {
            setFirstNameError('Одно из полей должно быть заполнено')
            setSecondNameError('Одно из полей должно быть заполнено')
            setIsNameChoosen(false)
        } else if (e.currentTarget.value[0] === ' ') {
            setFirstNameError('Строка не должна начинаться с пробела')
            setIsNameChoosen(false)
        }
        else{
            setFirstNameError('');
            setIsNameChoosen(true);
            document.documentElement.style.setProperty(first_class_name, "1px solid #EEEDED")
            document.documentElement.style.setProperty(second_class_name, "1px solid #EEEDED")
        }
    }

    const secondNameHandler = (e: React.FormEvent<HTMLInputElement>, first_class_name: string, second_class_name: string): void => {
        setSecondName(e.currentTarget.value)
        if (e.currentTarget.value.length < 1 && (document.getElementById('firstName') as HTMLInputElement).value === '') {
            setFirstNameError('Одно из полей должно быть заполнено')
            setSecondNameError('Одно из полей должно быть заполнено')
            setIsNameChoosen(false)
        } else if (e.currentTarget.value[0] === ' ') {
            setSecondNameError('Строка не должна начинаться с пробела')
            setIsNameChoosen(false)
        }
        else {
            setSecondNameError('')
            setIsNameChoosen(true)
            document.documentElement.style.setProperty(first_class_name, "1px solid #EEEDED")
            document.documentElement.style.setProperty(second_class_name, "1px solid #EEEDED")
        }
    }

    const emailHandler = (e: React.FormEvent<HTMLInputElement>, class_name: string): void => {
        setEmail(e.currentTarget.value)
        if (e.currentTarget.value.length < 1) {
            setEmailError('Поле email не может быть пустым');
        } else if (e.currentTarget.value[0] === ' ') {
            setEmailError('email не должен начинаться с пробела');
        }
        else {
            setEmailError('');
            document.documentElement.style.setProperty(class_name, "1px solid #EEEDED")
        }
    }

    const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>, class_name: string): void => {
        setCategory(e.currentTarget.value)
        if (e.currentTarget.value.length < 1) {
            setCategoryError('Поле категории не может быть пустым');
        }
        else {
            setCategoryError('');
            document.documentElement.style.setProperty(class_name, "1px solid #EEEDED")
        }
    }

    const messageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>, class_name: string): void => {
        setMessage(e.currentTarget.value)
        if (e.currentTarget.value.length < 10) {
            setMessageError('Поле сообщения должно содержать минимум 10 символов');
        } else if (e.currentTarget.value[0] === ' ') {
            setMessageError('Строка не должна начинаться с пробела');
        }
        else {
            setMessageError('');
            document.documentElement.style.setProperty(class_name, "1px solid #EEEDED")
        }
    }

    const blurhandler = (e: React.FocusEvent<HTMLTextAreaElement> | React.FocusEvent<HTMLSelectElement> | React.FocusEvent<HTMLInputElement>): void => {
        switch (e.currentTarget.name) {
            case 'firstName':
                setFirstNameDirty(true)
                setSecondNameDirty(true)
                break

            case 'secondName':
                setFirstNameDirty(true)
                setSecondNameDirty(true)
                break

            case 'email':
                setEmailDirty(true)
                break

            case 'category':
                setCategoryDirty(true)
                break

            case 'message':
                setMessageDirty(true)
                break
            
            default:
                return;
        }
    }

    const setDirties = (): void => {
        setFirstNameDirty(true)
        setSecondNameDirty(true)
        setEmailDirty(true)
        setCategoryDirty(true)
        setMessageDirty(true)
    }

    const checkImg = (): false | undefined => {
        const oFile = (document.getElementById("fileUpload") as any).files[0]; 
        const allowedExtensions: RegExp = /(\.jpg|\.png)$/i;

        if(!allowedExtensions.exec((document.getElementById("fileUpload") as HTMLInputElement ).value)) {
            alert('Неверный формат изображения. Доступные форматы: jpg, png');
            (document.getElementById("fileUpload") as HTMLInputElement).value = '';
            return false;
        }

        if (oFile.size > 2097152) // 2 MiB for bytes.
        {
          alert("Размер изображения должен быть меньше чем 2Мб");
          (document.getElementById('fileUpload') as HTMLInputElement).value = '';
          return;
        }
        else {
            setImage(oFile.name)
        }
    }

    type dataType = {
        firstName: string | null,
        secondName: string | null,
        email: string,
        category: string,
        message: string,
        image: string
    }

    const collectData = (): void => {
        const data: dataType = {
            firstName: firstName,
            secondName: secondName,
            email: email,
            category: category,
            message: message,
            image: image
        }

        const json: string = JSON.stringify(data);

        console.log(json)
    }

    return(
        <div className='modal_position'>
            <div className='modal'>
                <div className='modal__content'>
                    <div className='modal__label'>Имя</div>
                    {(firstNameDirty && firstNameError && !isNameChoosen) && document.documentElement.style.setProperty("--firstNameBorderStyle", "1px solid red")}
                    {firstNameDirty && firstNameError && !isNameChoosen && <div style={{color: 'red'}}>{firstNameError}</div>}
                    <input onChange={e => firstNameHandler(e, '--firstNameBorderStyle', '--secondNameBorderStyle')} value={firstName} onBlur={e => blurhandler(e)} name='firstName' id='firstName' className='modal__input modal__firstName' type='text' />

                    <div className='modal__label'>Фамилия</div>
                    {(secondNameDirty && secondNameError && !isNameChoosen) && document.documentElement.style.setProperty("--secondNameBorderStyle", "1px solid red")}
                    {secondNameDirty && secondNameError && !isNameChoosen && <div style={{color: 'red'}}>{secondNameError}</div>}
                    <input onChange={e => secondNameHandler(e, '--firstNameBorderStyle', '--secondNameBorderStyle')} value={secondName} onBlur={e => blurhandler(e)} name='secondName' id='secondName' className='modal__input modal__secondName' type='text' />

                    <div className='modal__label'>Email</div>
                    {(emailDirty && emailError) && document.documentElement.style.setProperty("--emailBorderStyle", "1px solid red")}
                    {emailDirty && emailError && <div style={{color: 'red'}}>{emailError}</div>}
                    <input onChange={e => emailHandler(e, '--emailBorderStyle')} value={email} onBlur={e => blurhandler(e)} name='email' id='email' className='modal__input modal__email' type='text' />

                    <div className='modal__label'>Категория сообщения</div>
                    <select onChange={e => categoryHandler(e, '--categoryBorderStyle')} value={category} onBlur={e => blurhandler(e)} name='category' id='category' className='modal__input modal__category'>
                        <option value='' disabled selected hidden></option>
                        <option value='Сообщение об ошибке'>Сообщение об ошибке</option>   
                        <option value='Вопрос'>Вопрос</option> 
                        <option value='Пожелание'>Пожелание</option>    
                    </select>
                    {(categoryDirty && categoryError) && document.documentElement.style.setProperty("--categoryBorderStyle", "1px solid red")}
                    {categoryDirty && categoryError && <div style={{color: 'red'}}>{categoryError}</div>}

                    <div className='modal__label'>Сообщение</div>
                    {(messageDirty && messageError) && document.documentElement.style.setProperty("--messageBorderStyle", "1px solid red")}
                    {messageDirty && messageError && <div style={{color: 'red'}}>{messageError}</div>}
                    <textarea onChange={e => messageHandler(e, '--messageBorderStyle')} value={message} onBlur={e => blurhandler(e)}  name='message' id='message' className='modal__input modal__text_area modal__message' />

                    <div className='modal__label'>Изображение</div>
                    <input type='file' accept='image/png, image/jpg' id='fileUpload' onChange={checkImg} />

                    {!isNameChoosen || emailError || categoryError || messageError ? <div onClick={setDirties} className='modal__continue_button'><div>Продолжить</div></div> : <div className='modal__continue_button' onClick={collectData}>Продолжить</div>}
                </div>
            </div>
        </div>
    );
}

export default MessageForm;