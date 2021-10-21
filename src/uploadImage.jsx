import React from "react";
import { getArrErrorsMessage, getError, getFileSchema } from "./helpers";
import { FieldArray } from "formik";

function UploadImage({ values, errors }) {
  return (
    <FieldArray name="file">
      {(arrayHelper) => (
        <>
          <input
            className="form__info-input form__info-input__hide"
            type="file"
            name="file"
            id="upload"
            onChange={(e) => {
              const { files } = e.target;
              const file = getFileSchema(files.item(0));
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
          <label className="label__upload-img" for="upload">
            {!values.file ? "Загрузить фото" : values.file[0].name}
          </label>
          {getArrErrorsMessage(errors.file).map((error) =>
            getError(true, error)
          )}
        </>
      )}
    </FieldArray>
  );
}

export default UploadImage;
