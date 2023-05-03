import React from 'react';
import { TextField } from '@mui/material';

const FileField = ({ formik, handlerFile }) => (
  <TextField
    fullWidth
    id={'file'}
    error={formik.touched.file && Boolean(formik.errors.file)}
    helperText={formik.touched.file && formik.errors.file}
    type={'file'}
    onChange={handlerFile}
  />
);

export default FileField;
