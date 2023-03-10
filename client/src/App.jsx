import React from "react";
import { Toaster } from "react-hot-toast";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default function App() {
  return (
    <div className="container">
      <h2>Blog MicroService</h2>
      <h3>Welcome to Blog Micro Service</h3>
      <p>Create new post</p>
      <PostCreate />
      <PostList />
      <Toaster />
    </div>
  );
}
