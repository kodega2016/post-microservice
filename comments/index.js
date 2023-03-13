const express = require("express");
const app = express();
const axios = require("axios");

const { randomBytes } = require("crypto");
require("colors");

// set cors
const cors = require("cors");
app.use(cors());

// set body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentsByPost = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    data: commentsByPost[id] ?? [],
    success: true,
    message: "comments fetched successfully",
  });
});

app.post("/posts/:id/comments", (req, res) => {
  const commentID = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id } = req.params;
  const comments = commentsByPost[id] || [];

  comments.push({
    id: commentID,
    content,
    status: "pending",
  });

  // trigger event
  axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentID,
      content,
      postID: id,
      status: "pending",
    },
  });

  commentsByPost[id] = comments;

  res.status(200).json({
    data: commentsByPost[id],
    success: true,
    message: "comments added successfully",
  });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postID, status, content } = data;
    const comments = commentsByPost[postID];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    // trigger event
    axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postID,
        status,
        content,
      },
    });
  }

  console.log(type, data);

  res.status(200).json({
    data: null,
    success: true,
    message: "events received successfully",
  });
});

const PORT = 4001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});

process.on("unhandledRejection", async (err) => {
  console.log(`server error: ${err.message}`);
  server.close();
  process.exit(1);
});
