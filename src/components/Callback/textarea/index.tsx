import React, {useState} from 'react'
import {ITextAreaProps} from '../textarea/interface'

const TextArea = (props:ITextAreaProps) => {

    const [count, handleChar] = useState(props.minLength)
    const [isZiro, handleZiro] = useState(false)
    const [isLength, handleIsLengthMessage] = useState(false)
    

    function handleTextLengt(e:HTMLTextAreaElement){
        handleChar(props.minLength - e.value.length)
        if(((props.minLength - e.value.length) < props.minLength) && (props.minLength - e.value.length) > 0 ){
            props.isLengthMessage(false)
            handleIsLengthMessage(true)
        }else{
            props.isLengthMessage(true)
            handleIsLengthMessage(false)
        }

        if((props.minLength - e.value.length) <= 0){
           
            handleZiro(true)
            
            props.pushTextArea(e.value)
            props.pushIsTextArea(true)
        }else if((props.minLength - e.value.length) >= 0){
            handleZiro(false)
            props.pushIsTextArea(false)
        }
    }

    return (
        <div className="container-form__input__textMessage">
            <div>Текст сообщения</div>
            <textarea id="input__textMessage-id" className="input_textMessage_cl"  name="textMessage"  onInput={ (e)=>handleTextLengt(e.currentTarget) }  ></textarea>
            <div>
                <span className="countSymbol">Минимальное количество символов 10</span>
                <div>
                { isLength ? <span className="leftSymbol"> Раз уж начали печатать, допишите ещё {count} символов, иначе запрос не отправится</span> : "" }
                </div>
                
                
            </div>
        </div>
    )
}

export default TextArea
