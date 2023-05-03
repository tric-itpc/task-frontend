import React from 'react';
import { TextField } from '@mui/material';

const SurnameField = ({ formik }) => (
  <TextField
    fullWidth
    placeholder={'Введите фамилию'}
    id={'surname'}
    name={'surname'}
    label={'Ваша фамилия'}
    value={formik.values.surname}
    onChange={formik.handleChange}
    error={formik.touched.surname && Boolean(formik.errors.surname)}
    helperText={formik.touched.surname && formik.errors.surname}
  />
);

export {
  SurnameField,
};
