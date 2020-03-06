import React from 'react'
import {Iinput} from './interface'



 const Input = (props:Iinput)=>{

    const getDataInput = (e:HTMLInputElement)=>{
        props.getData(e)
    }

    return(
        <div className={props.className}>
            <input type="text" placeholder={props.placeholder} data-field={props.dataTypeField} name={props.name} onInput={(e)=>{getDataInput(e.currentTarget)}} />
        </div>
    )
 }

 export default Input