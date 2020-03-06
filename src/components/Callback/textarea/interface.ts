export interface ITextAreaProps{
    minLength:number,
    pushIsTextArea(value:boolean):void,
    pushTextArea(value:string):void,
    isLengthMessage(value:boolean):void

}