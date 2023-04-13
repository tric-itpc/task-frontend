import { InitialValues } from "../types/types"

export const initialValues: InitialValues = {
    firstname: '', 
    lastname: '',  
    email: '',  
    message: '',  
    category: '',  
    pictures: undefined
}

export const checkSizeFiles = (value: File): boolean => {
    if (value.size > 2 * 1024 * 1024){
        return false
    } 
    return true
}