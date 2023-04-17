const getResponseData = (res, about) => {
  return res.ok ? res.json() : Promise.reject(`${about}: ${res.status}`);
};

export const sendFormData = (data) => {
  return fetch(`здесь мы куда-то отправим форму`, {
    method: "POST", //
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) =>
    getResponseData(res, "Данные не отправились!")
  );
};
