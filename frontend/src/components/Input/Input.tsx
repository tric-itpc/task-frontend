import { InputProps } from "./Input.props";

export const Input = ({ register, optionsValidate, name, errors, title, errorMessage, ...rest }: InputProps) => {
  return (
    <label className='form__label'>
      {title}
      <input
        className='form__input'
        {...register(name, {
          required: 'This field is required',
          ...optionsValidate
        })}
        {...rest}
      />
      {errors?.[name] && (
        <div className='error'>{errors?.[name]?.message || errorMessage}</div>
      )}
    </label>
  );
};
