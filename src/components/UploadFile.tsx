import React from 'react';
import { FieldArray } from 'formik';
import { getArrErrorsMessage, getFileSchema } from '../helpers';

interface PropsType {
  errors: any;
  values: any
}

export const UploadFile: React.FC<PropsType> = ({ errors, values }) => (
  <FieldArray name='file'>
    {(arrayHelper) => (
      <div className='file'>
        <input
          className='file__input input-hide'
          type='file'
          name='file'
          id='upload'
          onChange={(e) => {
            const { files } = e.target;
            const file = getFileSchema(files?.item(0));
            if (!file) {
              arrayHelper.remove(0);
            }
            if (Array.isArray(values.file)) {
              arrayHelper.replace(0, file);
            } else {
              arrayHelper.push(file);
            }
          }}
        />
        <label className='file__label' htmlFor='upload'>
          {!values.file ? 'Загрузить фото' : values.file[0].name}
        </label>
        {getArrErrorsMessage(errors.file).map((error: any) =>
          error && <p key={error} className='file__error-msg error-msg'>{error}</p>
        )}
      </div>
    )}
  </FieldArray>
);