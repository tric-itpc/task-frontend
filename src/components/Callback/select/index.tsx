import React, {useState} from 'react'
import {ICatMessage} from './interface'

const Select =(props:ICatMessage)=>{

    const [valuesSelect, handleSelect] = useState("")
            const handleSelectOption=(value:any)=>{
                handleSelect(value.value)
                props.getCatMessage(String(value.value))
                props.isCaTMessage(Boolean(value.value))
    }

   

    
        
   

    

    return(
        <div className="container-form__input__catMessega">
            <div>
                <span>
                    { !Boolean(valuesSelect) ? "Выберите категорию*" : ""}
                </span>
            </div>
            <select name="catMessage" id="" value={valuesSelect} onChange={(e)=>{handleSelectOption(e.currentTarget )}} > 
                 <option value=""></option>
                {
                    props.listMessage.map((value, index)=>
                        (
                            <option key={index} value={value} >{value}</option>
                        )
                    )
                }
            </select>
            
        </div>
    )
}

export default Select