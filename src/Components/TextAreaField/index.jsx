import React from 'react';
import { TextField } from '@mui/material';

const TextAreaField = ({ formik }) => (
  <TextField
    fullWidth
    id={'textarea'}
    name={'textarea'}
    placeholder={'Введите сообщение'}
    label={'Сообщение'}
    value={formik.values.textarea}
    onChange={formik.handleChange}
    error={formik.touched.textarea && Boolean(formik.errors.textarea)}
    helperText={formik.touched.textarea && formik.errors.textarea}
    multiline
    rows={2}
    maxRows={4}
  />
);

export {
  TextAreaField,
};
