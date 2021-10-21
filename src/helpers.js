import React from "react";

const getError = (touched, error) => {
  return (
    touched &&
    error && (
      <p key={error} className={"error"}>
        {error}
      </p>
    )
  );
};

const getFileSchema = (file) =>
  file && {
    file: file,
    type: file.type,
    name: file.name,
  };

const getArrErrorsMessage = (errors) => {
  const result = [];
  errors &&
    Array.isArray(errors) &&
    errors.forEach((value) => {
      if (typeof value === "string") {
        result.push(value);
      } else {
        Object.values(value).forEach((error) => {
          result.push(error);
        });
      }
    });
  return result;
};

export { getError, getArrErrorsMessage, getFileSchema };
