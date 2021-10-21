import React from "react";

function DropDownList({ handleChange, handleBlur, values }) {
  return (
    <>
      <label htmlFor="categories">Ввыберите категорию сообщения</label>
      <select
        className="form__info-input"
        name="categories"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.categories}
      >
        <option className="form__info-input_option" selected disabled>
          {" "}
        </option>
        <option>Жалоба</option>
        <option>Отзыв</option>
        <option>Улучшить продукт</option>
      </select>
    </>
  );
}

export default DropDownList;
