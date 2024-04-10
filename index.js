const express = require("express");
const app = express();
const path = require("path");
const ioConnection = require("./chat");
const http = require("http").Server(app);

ioConnection.attach(http);

app.set("view engine", "ejs");
app.set("views", path.join(`${__dirname}/`, "views"));

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.render("join");
});

app.post("/", (req, res) => {
  console.log(req.body.group);
  if (req.body.name && req.body.group) {
    return res.render("chat", {
      name: req.body.name,
      groupId: req.body.group,
    });
  }
  return res.render("join");
});

http.listen(6003, () => {
  console.log("listening on port 6003");
});
