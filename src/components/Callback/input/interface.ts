export interface Iinput{
    className:string,
    placeholder:string,
    name:string,
    dataTypeField:string
    getData(value:HTMLElement):void
}