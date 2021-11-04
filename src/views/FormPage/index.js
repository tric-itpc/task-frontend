import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const FormPage = () => {
    const [image, setImage] = useState('')
    const handleImage = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('upload_preset', 'gallery')
        axios.post('https://api.cloudinary.com/v1_1/dktewh88s/upload', formData)
            .then(({data}) => setImage(data.url))
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            firstName: '',
            email: '',
            typeOfMessage: '',
            message: '',
            addImage: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Введите Имя'),
            firstName: Yup.string()
                .required('Введите Фамилию'),
            email: Yup.string()
                .email('email должен содержать @')
                .required('Введите email'),
            typeOfMessage: Yup.string()
                .required('Выберите тип сообощения'),
            message: Yup.string()
                .min(10, 'Минимум 10 символов')
                .required('Выберите тип сообощения'),
            addImage: Yup.mixed()

        }),
        onSubmit: values => {
            values.addImage = image
            alert(JSON.stringify(values, null, 2))
        },
    })
    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
                <div className='row col-md-4 offset-md-4'>
                    <div className='my-4'>
                        <input
                            className='form-control'
                            placeholder='Введите имя'
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name ? <div className='text-danger fw-bolder'>{formik.errors.name}</div> : null}
                    </div>
                    <div>
                        <input
                            className='form-control'
                            placeholder='Введите фамилию'
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        {formik.errors.firstName ?
                            <div className='text-danger fw-bolder'>{formik.errors.firstName}</div> : null}
                    </div>
                    <div className='my-4'>
                        <input
                            className='form-control'
                            placeholder='Введите Email'
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email ?
                            <div className='text-danger fw-bolder'>{formik.errors.email}</div> : null}
                    </div>
                    <div>
                        <textarea
                            className='form-control'
                            placeholder='Введите сообщение'
                            id="message"
                            name="message"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                        />
                        {formik.errors.message ?
                            <div className='text-danger fw-bolder'>{formik.errors.message}</div> : null}
                    </div>
                    <div className='my-4'>
                        <select id='typeOfMessage'
                                name='typeOfMessage'
                                onChange={formik.handleChange}
                                value={formik.values.typeOfMessage}
                        >
                            <option disabled/>
                            <option value="thanks">Благодарность</option>
                            <option value="complaint">Жалоба</option>
                        </select>
                        {formik.errors.typeOfMessage ?
                            <div className='text-danger fw-bolder'>{formik.errors.typeOfMessage}</div> : null}
                    </div>
                    <div>
                        <input id="addImage"
                               name="addImage"
                               className='form-control'
                               type="file"
                               onChange={handleImage}
                        />

                    </div>
                </div>
                <button type={"submit"} className='btn btn-primary mx-auto d-block'>Submit</button>
            </form>
        </div>
    );
};

export default FormPage;