import React, { FormEvent, useState } from 'react';
import { Button, FormHelperText, Grid, MenuItem, TextField, Typography } from '@mui/material';
import swal from 'sweetalert';
import { useInput } from '../../hooks/useInput';
import { useFile } from '../../hooks/useFile';
import { IFormData, IInputData, InputsData, InputNames } from '../../types/types';
import { getIsSubmitDisabled } from '../../utils/validates';
import { encodeToBase64, fakeSendData } from '../../utils/common';

const selectOptions = [
  {label: 'Вопрос', value: 'question'},
  {label: 'Жалоба', value: 'complaint'},
  {label: 'Отзыв', value: 'review'},
];

const Form = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const file = useFile();
  const inputs: InputsData = {
    [InputNames.name]: {name: InputNames.name, label: 'Ваше имя', required: false, props: useInput('', InputNames.name, false)},
    [InputNames.lastname]: {name: InputNames.lastname, label: 'Ваша фамилия', required: false, props: useInput('', InputNames.lastname, false)},
    [InputNames.email]: {name: InputNames.email, label: 'Ваш E-mail', required: true, props: useInput('', InputNames.email, true)},
    [InputNames.message]: {name: InputNames.message, label: 'Ваше сообщение', required: true, props: useInput('', InputNames.message, true)},
    [InputNames.select]: {name: InputNames.select, label: 'Тип сообщения', required: true, props: useInput('', InputNames.select, true)},
  };
  const inputsCount = Object.keys(inputs).length;

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const dataToAPI: IFormData = {
      name: inputs.name?.props.value || null,
      lastname: inputs.lastname?.props.value || null,
      email: inputs.email?.props.value as string,
      message: inputs.message?.props.value as string,
      messageType: inputs.select?.props.value as string,
      image: null,
    };

    if (file.file) {
      dataToAPI.image = await encodeToBase64(file.file);
    }

    setIsLoading(true);

    //TODO: add send data logic
    fakeSendData(dataToAPI)
      .then(() => {
        setIsLoading(false);
        swal('', 'Отправка данных выполнена успешно', 'success');
        let key: keyof typeof InputNames;
        for (key in inputs) {
          inputs[key].props.setValue?.('');
        }
        file.setFile(null);
      });
  };

  return (
    <form onSubmit={handleSubmit} >

      <Typography variant='h4' component='h1' align='center' mb={4} pt={2}>
        Форма обратной связи
      </Typography>

      <Grid container justifyContent='space-between' spacing={4} p={4}>
        {Object.values(inputs).map(({name, label, required, props}: IInputData, index: number) => {
          const ownProps = {...props};
          delete ownProps.setValue;

          return (
            <Grid item key={name} xs={12} order={index} md={name === 'select' ? 5 : 12}>
              <TextField
                fullWidth
                label={label}
                variant='outlined'
                required={required}
                select={name === 'select'}
                rows={name === 'message' ? 4 : undefined}
                multiline={name === 'message'}
                FormHelperTextProps={{sx: {position: 'absolute', top: '100%'}}}
                {...ownProps}
              >
                {name === InputNames.select &&
                selectOptions.map(({value, label}) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))
                }
              </TextField>
            </Grid>
          )
        })}

        <Grid item xs={12} md={5} order={inputsCount - 2}>
          <Button component='label' variant='outlined' fullWidth sx={{height: '100%'}}>
            Загрузить картинку
            <input type='file' hidden accept='image/jpeg, image/png' onChange={file.onChange} />
          </Button>
          { file.file &&
            <FormHelperText error={file.error} sx={{position: 'absolute'}}>
              {
                file.error
                  ? file.errorText
                  : `Файл: ${file.file.name}`
              }
            </FormHelperText>
          }
        </Grid>

        <Grid item xs={12} order={inputsCount}>
          <Button
            size='large'
            fullWidth
            variant='contained'
            type='submit'

            disabled={getIsSubmitDisabled(inputs, file.error) || isLoading}
          >
            {isLoading ? 'Отправка...' : 'Отправить'}
          </Button>
        </Grid>
      </Grid>

    </form>
  );
};

export default Form;
