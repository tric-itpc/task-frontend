import { SelectProps } from './Select.props';

export const Select = ({
  register,
  errors,
  options,
  name,
  ...rest
}: SelectProps) => {
  return (
    <label className='form__label'>
      Category
      <select
        className='form__input select'
        defaultValue={''}
        {...register(name, {
          required: 'This field is required',
        })}
        {...rest}
      >
        {options.map(({ value, label, disabled = false }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
      {errors?.[name] && <div className='error'>{errors?.[name]?.message}</div>}
    </label>
  );
};
