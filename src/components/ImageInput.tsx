import FormInput from "./FormInput";

interface ImageProps {
    type: string;
    name: string;
    accept: string;
    label?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}  

const ImageInput = ({name, label, accept, type, onChange,}: ImageProps) => {

    return(
        <div className="form--item item-mt">
        <label htmlFor={name}>{label}</label>
        <input
            className='form--item-input'
            type={type}
            accept={accept}
            name={name}
            onChange={onChange}
        ></input>
        </div>
    )
}


export default ImageInput;