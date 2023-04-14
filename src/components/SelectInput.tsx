
interface SelectProps {
    name: string;
    label?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    error: string;
}

const SelectInput = ({label, name, onChange, value, error}:SelectProps) => {

    return(
        <div className="form--item item-mt">
            <label htmlFor={name}>{label}</label>
            <select className='form--item-input'
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value="" hidden>
                    Выберите тип сообщения
                </option>
                <option value="important">Важное</option>
                <option value="suggestion">Предложение</option>
                <option value="response">Ответ</option>
            </select>
            {error && <p className='error-text'>{error}</p>}
        </div>
    )
}

export default SelectInput;