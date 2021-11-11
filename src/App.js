import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    category: "",
    message: "",
    picture: "",
  });
  const [errors, setErrors] = useState({});

  const findErrors = () => {
    const { name, lastname, email, category, message, picture } = form;
    const newErrors = {};
    const pictureType = picture?.type?.split("/")[1];
    const pictureSize = picture?.size;

    if (name.length === 0 && !lastname && lastname.length === 0) {
      newErrors.name = "напишите имя";
      newErrors.lastname = "или хотя бы фамилию";
    }
    if (
      pictureType !== "jpeg" &&
      pictureType !== "jpg" &&
      pictureType !== "png"
    ) {
      newErrors.picture = "картинка должна быть в формате 'jpg' или 'png'";
    }
    if (pictureSize > 2097152)
      newErrors.picture = "картинка должна быть меньше 2 мегабайт";
    if (message.length === 0) {
      newErrors.message =
        "сообщение надо обязательно написать, всё таки, обратная связь же)";
    }
    if (message.length > 0 && message.length < 10) {
      newErrors.message = `напишите ещё хотя бы ${
        10 - message.length
      } символов(a))`;
    }
    if (category === "") newErrors.category = "выберите категорию сообщения";
    if (email.length === 0) newErrors.email = "без email нельзя";

    return newErrors;
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = findErrors();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      // alert("Всё четенько!");
      let feedback = new FormData();
      feedback.append("name", form.name);
      feedback.append("lastname", form.lastname);
      feedback.append("email", form.email);
      feedback.append("category", form.category);
      feedback.append("message", form.message);
      feedback.append("image", form.picture);

      return fetch("урл", {
        method: "POST",
        body: feedback,
      }).then((res) => {
        if (res.ok) {
          console.log("fckyeeah");
        } else {
          console.log(res.statusText);
        }
      });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h3>Форма обратной связи</h3>
      <Form
        style={{ maxWidth: "400px" }}
        className="col-lg-8 col-md-8 col-sm-6 col-xs-4"
      >
        <Form.Group className="mb-2">
          <Form.Label className="mb-0">Имя</Form.Label>
          <Form.Control
            onChange={(e) => setField("name", e.target.value)}
            isInvalid={!!errors.name}
            placeholder="Введите имя"
            type="text"
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="mb-0">Фамилия</Form.Label>
          <Form.Control
            onChange={(e) => setField("lastname", e.target.value)}
            isInvalid={!!errors.lastname}
            placeholder="Введите фамилию"
            type="text"
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastname}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="mb-0">Email</Form.Label>
          <Form.Control
            onChange={(e) => setField("email", e.target.value)}
            isInvalid={!!errors.email}
            placeholder="Введите email"
            type="email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="mb-0">Категория</Form.Label>
          <Form.Control
            onChange={(e) => setField("category", e.target.value)}
            isInvalid={!!errors.category}
            as="select"
          >
            <option value="">Выберите категорию сообщения:</option>
            <option value="thanks">Благодарность</option>
            <option value="complaint">Жалоба</option>
            <option value="comment">Предложение</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="mb-0">Сообщение</Form.Label>
          <Form.Control
            onChange={(e) => setField("message", e.target.value)}
            isInvalid={!!errors.message}
            placeholder="Напишите сообщение"
            as="textarea"
          />
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="mb-0">Картинка</Form.Label>
          <Form.Control
            onChange={(e) => setField("picture", e.target.files[0])}
            isInvalid={!!errors.picture}
            type="file"
          />
          <Form.Control.Feedback type="invalid">
            {errors.picture}
          </Form.Control.Feedback>
        </Form.Group>
        <Button onClick={handleSubmit} type="submit" className="btn-success">
          Отправить
        </Button>
      </Form>
    </div>
  );
}

export default App;
