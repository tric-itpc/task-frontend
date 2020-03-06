import React from 'react'
import {Iimages} from './interface'

const Images = (props:Iimages)=>{

    function handleFile(data:HTMLInputElement){
        if(data.files){
            props.getNameFile(data.files[0].name)
            props.getIsInfoImage(true)
        }else{
            props.getIsInfoImage(false)
        }
    }

    return(
        <div className="container-form__input__addFile">
            <input type="file" name="nameImage" id="input_file" size={props.sizeImage} onChange={(e)=>{handleFile(e.currentTarget)}} accept={props.acceptImage} />
        </div>
    )

}

export default Images