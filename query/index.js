const express = require("express");
const app = express();
require("colors");

// setup body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup cors
const cors = require("cors");
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.status(200).json({
    data: posts,
    message: "posts fetched successfully",
    success: true,
  });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title, content } = data;
    posts[id] = { id, title, content, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postID } = data;
    const post = posts[postID];
    if (post) {
      post.comments.push({ id, content });
    }
  }

  res.status(200).send({
    data: null,
    success: true,
    message: "Events received successfully",
  });
});

const PORT = 4002;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => process.exit(1));
});
