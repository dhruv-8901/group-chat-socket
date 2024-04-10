const express = require("express");
const app = express();
const path = require("path");
const ioConnection = require("./chat");
const http = require("http").Server(app);

ioConnection.attach(http);

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

http.listen(6003, () => {
  console.log("listening on port 6003");
});
