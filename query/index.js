const express = require("express");
const app = express();
const axios = require("axios");
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

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title, content } = data;
    posts[id] = { id, title, content, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postID, status } = data;
    const post = posts[postID];
    if (post) {
      post.comments.push({ id, content, status });
    }
  }

  if (type === "CommentUpdated") {
    const { id, content, postID, status } = data;
    const post = posts[postID];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.status(200).send({
    data: null,
    success: true,
    message: "Events received successfully",
  });
});

const PORT = 4002;
const server = app.listen(PORT, async () => {
  try {
    const events = await axios.get("http://localhost:4005/events");

    for (let event of events.data.data) {
      console.log("Processing event:", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.log(err);
  }

  console.log(`Server running on port ${PORT}`.yellow.bold);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => process.exit(1));
});
