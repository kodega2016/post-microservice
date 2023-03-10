const { default: axios } = require("axios");
const express = require("express");
const app = express();

// setup body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const events = [];

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  const event = req.body;
  events.push(event);
  axios.post("http://localhost:4000/events", event).catch(e=>console.log(e.message));
  axios.post("http://localhost:4001/events", event).catch(e=>console.log(e.message));
  axios.post("http://localhost:4002/events", event).catch(e=>console.log(e.message));

  res.status(200).send({
    data: null,
    success: true,
    message: "Events triggered successfully",
  });
});

app.get("/events", (req, res) => {
  res.status(200).send({
    data: events,
    success: true,
    message: "Events fetched successfully",
  });
});

const PORT = 4005;
const server = app.listen(PORT, () => {
  console.log(`Event Bus listening on port ${PORT}`);
});

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  server.close();
  process.exit(1);
  // application specific logging, throwing an error, or other logic here
});
