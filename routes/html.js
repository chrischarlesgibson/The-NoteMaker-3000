const express = require("express");
// const html = express.Router();
const path = require("path");
const html = express();

// get request for notes html
html.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "../../public/notes.html"));
  console.info(`${req.method} request received to get notes`);
});

// get request for index html
html.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../../public/index.html"));
  console.info(`${req.method} request received`);
});

module.exports = html;
