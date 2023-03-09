const express = require("express");
const app = express();
const { randomBytes } = require("crypto");

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

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = {
    id,
    title,
    content,
  };
  res.status(201).json({
    data: posts,
    message: "post created successfully",
    success: true,
  });
});

const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.green.inverse);
});

process.on("unhandledRejection", (err) => {
  console.log(`server error:${err.message}`.bgRed);
  server.close();
  process.exit(1);
});
