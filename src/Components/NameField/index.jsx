import React from 'react';
import { TextField } from '@mui/material';

const NameField = ({ formik }) => (
  <TextField
    fullWidth
    placeholder={'Введите имя'}
    id={'name'}
    name={'name'}
    label={'Ваше имя'}
    value={formik.values.name}
    onChange={formik.handleChange}
    error={formik.touched.name && Boolean(formik.errors.name)}
    helperText={formik.touched.name && formik.errors.name}
  />
);

export {
  NameField,
};
