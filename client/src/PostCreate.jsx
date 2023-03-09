import React, { useState } from "react";

export default function PostCreate() {
  const initialValues = {
    title: "",
    content: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          defaultValue={values.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          defaultValue={values.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
