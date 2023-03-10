import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const response = await axios.post("http://localhost:4000/posts", values);
      toast.success(response.data.message);
      setValues(initialValues);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="card mt-2">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Post Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter post title"
                name="title"
                defaultValue={values.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Post Content</label>
              <textarea
                name="content"
                className="form-control"
                defaultValue={values.content}
                onChange={handleChange}
                rows="3"
                placeholder="Enter post content"
              ></textarea>
            </div>

            <button type="submit" className="mt-4 btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
