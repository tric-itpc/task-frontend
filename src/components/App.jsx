import React, { useState } from "react";

function App(props) {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [mail, setMail] = useState("");
  const [file, setFile] = useState();
  const [error, setError] = useState(false);

  const handleFile = (e) => {
    const fileType = e.target.files[0].type.split("/")[1];
    const fileSize = e.target.files[0].size;

    if (fileType === "jpg" || fileType === "png") {
      setError(false);
      if (fileSize <= 2000000) {
        setFile(e.target.files[0]);
      } else {
        alert("размер превышает ограничения");
        setError(true);
        return;
      }
    } else {
      alert("разрешенный формат картинки: jpg и png");
      setError(true);
      return;
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        secondName,
        mail,
        formData,
      }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className={"container"}>
      <center>
        <form onSubmit={handleAdd}>
        <fieldset className={"field"}>
          <legend align={"right"}>форма</legend>
          <table cellSpacing={"15px"} cellPadding={"0px"}>
            <tr>
              <td>
                <label htmlFor="">имя</label>
              </td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={"введите ваше имя"}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">фамилия</label>
              </td>
              <td>
                <input
                  type="text"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                  required={name.length <= 0 ? true : null}
                  placeholder={"введите вашу фамилию"}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">почта</label>
              </td>
              <td>
                <input
                  type="email"
                  required={true}
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder={"введите вашу почту"}
                />
              </td>
            </tr>
              <tr>
                  <td>
                      <label htmlFor="">категории</label>
                  </td>
                  <td>
                      <select name="" id="" required={true}>
                          <option selected={true} disabled>
                              {""}
                          </option>
                          <option value="повседневное">повседневное</option>
                          <option value="ошибка">ошибка</option>
                        <option value="важное">важное</option>
                      </select>
                  </td>
              </tr>
              <tr>
                  <td>загрузить фото</td>
                  <td><input type="file" onChange={handleFile} /></td>
              </tr>
            <tr>
              <td>
                <label htmlFor="">сообщение</label>
              </td>
              <td>
                <textarea
                  required={true}
                  minLength={"10"}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                />
              </td>
            </tr>
          </table>
          <input type="submit" disabled={error} />
        </fieldset>
        </form>
      </center>
    </div>
  );
}

export default App;

