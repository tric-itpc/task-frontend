import { useForm, SubmitHandler } from 'react-hook-form';

import { isEmailValidate, isImageValidate } from '../../utils';
import { Feedback } from '../../types/Feedback.interface';

import './Form.scss';

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

    if ((isValid && firstName) || lastName) {
      console.log(JSON.stringify({...data, image: file.name}));
      reset();
      alert('Thank you for your feedback!');
    }
  };

  return (
    <form action='#' onSubmit={handleSubmit(onSubmit)} className='form'>
      <h1>Feedback 😍</h1>
      <div className='form__container'>
        <label className='form__label'>
          First Name
          <input
            className='form__input'
            placeholder='Your first name'
            {...register('firstName')}
          />
          {errors?.lastName && (
            <div className='error'>{errors?.firstName?.message}</div>
          )}
        </label>
        <label className='form__label'>
          Last Name
          <input
            className='form__input'
            placeholder='Your last name'
            {...register('lastName')}
          />
          {errors?.lastName && (
            <div className='error'>{errors?.lastName?.message}</div>
          )}
        </label>
        <label className='form__label'>
          Email
          <input
            placeholder='Your working email'
            type='email'
            className='form__input'
            {...register('email', {
              required: 'This field is required',
              validate: (value) => isEmailValidate(value),
            })}
          />
          {errors?.email && (
            <div className='error'>
              {errors?.email?.message || 'Please enter a valid email'}
            </div>
          )}
        </label>
        <label className='form__label'>
          Category
          <select
            className='form__input select'
            defaultValue={''}
            {...register('category', {
              required: 'This field is required',
            })}
          >
            <option value='' disabled>
              Select a category
            </option>
            <option value='Category2'>Category 0</option>
            <option value='Category3'>Category 1</option>
          </select>
          {errors?.category && (
            <div className='error'>{errors?.category?.message}</div>
          )}
        </label>
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
