import React from 'react'
import {Ibutton} from './interface'

const Button = (props:Ibutton)=>{
    
    

    return(
        <div className="container-form__input__btn">
            <input type="submit" value="Отправить" name="btn" className="input__btn" id="input_btn"  />
        </div>
    )
}


export default Button