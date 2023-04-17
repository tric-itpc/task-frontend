import { useEffect, useState } from "react";

import Form from "../Form/Form";
import Logo from "../Logo/Logo";

import * as api from "../../utils/api.js"

import './app.css'

function App() {
  const [formData, setFormData] = useState({}); //здесь будем хранить данные формы перед отправкой

  /** отсюда будем на бэк отправлять */
  const handleSubmitForm = (data) => {
    api.sendFormData(data)
  }

  useEffect(() => {
    console.log(formData)
  },[formData])


  return (
    <div className="App">
      <div className="page">
        <div className="page__container">
          <Logo />
          <Form setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default App;
