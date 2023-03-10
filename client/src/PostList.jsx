import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:4000/posts");
    setPosts(response.data.data);
  };

  return (
    <div className="mt-4">
      {Object.values(posts).map((post) => (
        <div className="card mt-2" key={post.id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
            <CommentCreate postId={post.id} />
            <hr />
            <CommentList postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
