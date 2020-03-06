import React from 'react'
import {Iemail} from './interface'


const Email = (props:Iemail) =>{

 
    function handleEmail(data:HTMLInputElement){
        let regExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        let resultReg = regExp.test(data.value)
        console.log(data.value.length)
        
        

        if(!resultReg){
            data.style.border = "2px solid red"
            props.isEmail(false)
        }else{
            data.style.border = "2px solid green"
            props.getEmail(data.value)
            props.isEmail(true)
        }

        if(data.value.length === 0){
            data.style.border = "1px solid #eee"
            props.isEmail(false)
        }
       
    }

    return(
        <div className="container-form__input__email">
            <input type="text" name="email" id="" placeholder="E-mail*" onInput={(e)=>{handleEmail(e.currentTarget)}} />
        </div>
    )
}

export default Email