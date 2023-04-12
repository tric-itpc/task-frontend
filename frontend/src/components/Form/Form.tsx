import { useForm, SubmitHandler } from 'react-hook-form';

import { isEmailValidate, isImageValidate } from '../../utils';
import { Feedback } from '../../types/Feedback.interface';

import './Form.scss';
import { Input } from '../Input/Input';
import { InputProps } from '../Input/Input.props';
import { Select } from '../Select/Select';

const formInputs: Omit<InputProps, 'register' | 'errors'>[] = [
  {
    name: 'firstName',
    title: 'First Name',
    placeholder: 'Your first name',
  },
  {
    name: 'lastName',
    title: 'Last Name',
    placeholder: 'Your last name',
  },
  {
    name: 'email',
    title: 'Email',
    placeholder: 'Your last name',
    optionsValidate: {
      validate: (value: string) => isEmailValidate(value),
    },
    errorMessage: 'Please enter a valid email',
  },
];

export const Form = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<Feedback>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<Feedback> = (data) => {
    const { image, firstName, lastName } = data;
    const file = image[0];

    if (!isImageValidate(file)) {
      setError('image', {
        message: 'Incorrect format or size over 2MB',
      });
      return;
    }

    if (isValid && (firstName || lastName)) {
      console.log(JSON.stringify({ ...data, image: file.name }));
      reset();
      alert('Thank you for your feedback!');
    }
  };

  return (
    <form action='#' onSubmit={handleSubmit(onSubmit)} className='form'>
      <h1>Feedback 😍</h1>
      <div className='form__container'>
        {formInputs.map((input) => (
          <Input
            key={input.name}
            register={register}
            errors={errors}
            errorMessage={input.errorMessage || ''}
            optionsValidate={input.optionsValidate || {}}
            {...input}
          />
        ))}
        <Select
          key={'category'}
          register={register}
          errors={errors}
          name={'category'}
          title={'Category'}
          options={[
            { value: '', label: 'Select a category', disabled: true },
            { value: 'Category0', label: 'Category 0' },
            { value: 'Category1', label: 'Category 1' },
            { value: 'Category2', label: 'Category 2' },
          ]}
        />
        <label className='form__label message'>
          <textarea
            placeholder='Add your comments...'
            rows={4}
            className='form__input'
            {...register('message', {
              required: 'This field is required',
              minLength: {
                value: 10,
                message: 'Must contain at least 10 letters',
              },
            })}
          />
          {errors?.message && (
            <div className='error'>{errors?.message?.message}</div>
          )}
        </label>
        <label className='file'>
          <input
            type='file'
            accept='.jpg, .jpeg, .png'
            {...register('image', {
              required: true,
            })}
          />
          {errors?.image && (
            <div className='error'>{errors?.image?.message}</div>
          )}
        </label>
      </div>
      <button type='submit' className='form__submit'>
        Submit
      </button>
    </form>
  );
};
