import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(response.data.data);
  };

  return (
    <div>
      <ul>
        {Object.values(comments).map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
