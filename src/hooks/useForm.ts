import {useState, useEffect, useRef} from 'react'
import { Errors, Values } from '../types'

interface FromUseForm {
    values: Values
    handlerChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    handleSubmit: (e: React.FormEvent) => void ,
    handlerSetFiles: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errors: Errors
}

const useForm = (
    callback: () => void, 
    validate: (values: Values) => any): FromUseForm => 
    
{
    const [values, setValues] = useState<Values>({
        name: '',
        secondName: '',
        email: '',
        title: '',
        text: '',
        file: ''
    })
    const [errors, setErrors] = useState<Errors | {}>({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [countOfSubbmiting, setCountOfSubbmiting] = useState<number>(0)

    const prevValuesRef = useRef<Values>(values);

    const handlerChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ): void => {
        const {name, value} = e.currentTarget
        setValues((prev) => {
            prevValuesRef.current = {
                ...prev,
                [name]: value
            }
            if(countOfSubbmiting > 0){
                setErrors(validate(prevValuesRef.current))
            }
            
            
            return prevValuesRef.current
        })
    }

    const handlerSetFiles = (
        e: React.ChangeEvent<any>
        //e: any
    ) => {
        if(e.target.files[0]){
            const file = e.target.files[0]
            
            setValues((prev) => {
                prevValuesRef.current = {
                    ...prev,
                    file: file
                }
                if(countOfSubbmiting > 0){
                    setErrors(validate(prevValuesRef.current))
                }

                return prevValuesRef.current
            })
        }
    }

    const handleSubmit  = (e: React.FormEvent): void => {
        
        setCountOfSubbmiting(countOfSubbmiting + 1)
        e.preventDefault()
        setErrors(validate(values))
        setIsSubmitting(true)
    
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            callback()

            // ready for send
            const sendingData = JSON.stringify({
                ...values,
                file: values.file.name
            })
            console.log('DATA: ', sendingData);          
        } else{
            setIsSubmitting(false)
        }

    }, [errors])

    return {
        values, 
        handlerChange, 
        handleSubmit, 
        handlerSetFiles,
        errors
    }
}

export default useForm