const express = require("express");
const app = express();

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
  });

  commentsByPost[id] = comments;

  res.status(200).json({
    data: commentsByPost[id],
    success: true,
    message: "comments added successfully",
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
