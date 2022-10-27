const express = require("express");
const html = express.Router();

// get request for notes html
html.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  console.info(`${req.method} request received to get reviews`);
});

// get request for index html
html.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  console.info(`${req.method} request received to get reviews`);
});

module.exports = html;
