import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });

      toast.success("Comment created!");
      setContent("");
    } catch (error) {
      console.log(error);
      toast.error("Error creating comment!");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
            value={content}
            placeholder="Enter comment here.."
            className="form-control"
            rows="2"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <button type="submit" className="mt-2 btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
