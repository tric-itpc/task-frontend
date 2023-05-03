import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectField = ({ formik }) => (
  <FormControl fullWidth>
    <InputLabel required id={'Категории'}>Категории</InputLabel>
    <Select
      id={'select'}
      name={'select'}
      value={formik.values.select}
      onChange={formik.handleChange}
      error={formik.touched.select && Boolean(formik.errors.select)}
      helperText={formik.touched.select && formik.errors.select}
      autoWidth
      label={'Категории'}
      labelId={'Категории'}
    >
      <MenuItem defaultValue value={''}><em>Ничего не выбрано</em></MenuItem>
      <MenuItem value={'1 категория'}>1 Категория</MenuItem>
      <MenuItem value={'2 категория'}>2 Категория</MenuItem>
      <MenuItem value={'3 категория'}>3 Категория</MenuItem>
    </Select>
  </FormControl>
);

export {
  SelectField,
};
