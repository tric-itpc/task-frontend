export interface Values{
    name: string,
    secondName: string,
    email: string,
    title: string,
    text: string,
    file: any
}
export interface Errors{
    person?: string,
    email?: string,
    title?: string,
    text?: string,
    file?: string
}
export enum TypeFiles {
    JPG = 'image/jpeg',
    PNG = 'image/png'
}