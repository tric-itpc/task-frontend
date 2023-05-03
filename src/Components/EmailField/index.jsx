import React from 'react';
import { TextField } from '@mui/material';

const EmailField = ({ formik }) => (
  <TextField
    fullWidth
    placeholder={'Введите Ваш email'}
    id={'email'}
    name={'email'}
    label={'Email'}
    value={formik.values.email}
    onChange={formik.handleChange}
    error={formik.touched.email && Boolean(formik.errors.email)}
    helperText={formik.touched.email && formik.errors.email}
  />
);

export {
  EmailField,
};
