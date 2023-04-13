export type File = {
    lastModified: number,
    lastModifiedDate?: Date,
    name: string,
    size: number,
    type: string,
    webkitRelativePath: string,
}

export type FormikType = {
    [value: string]: any
}

export interface InitialValues {
    firstname: string, 
    lastname: string,  
    email: string,  
    message: string,  
    category: string,  
    pictures: undefined | File
}