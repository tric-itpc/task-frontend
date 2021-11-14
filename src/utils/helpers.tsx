const getFileSchema = (file: any) =>
  file && {
    file: file,
    type: file.type,
    name: file.name,
  };

const getArrErrorsMessage = (errors: any) => {
  const result: any = [];
  errors &&
    Array.isArray(errors) &&
    errors.forEach((value) => {
      if (typeof value === 'string') {
        result.push(value);
      } else {
        Object.values(value).forEach((error) => {
          result.push(error);
        });
      }
    });
  return result;
};

export { getFileSchema, getArrErrorsMessage };
