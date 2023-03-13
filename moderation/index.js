const express = require("express");
const app = express();
const axios = require("axios");

// setup cors
const cors = require("cors");
app.use(cors());

// setup body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event received", type);

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postID: data.postID,
        status,
      },
    });
  }

  res.status(200).json({
    success: true,
    data: null,
    message: "Event received",
  });
});

const PORT = 4003;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
