const express = require("express");
// const html = express.Router();
const path = require("path");
const html = express();

// get request for notes html file
html.get("/notes", (req, res) => {
  //path.join joins the dirname(directory name and the ../../public notes into one single absolute path name)The res. sendFile() function basically transfers the file at the given path and it sets the Content-Type response HTTP header field based on the filename extension.
  res.sendFile(path.join(__dirname + "../../public/notes.html"));
  //logging message to confrim get request was succesful
  console.info(`${req.method} request received to get notes`);
});

// get request for index html file. * is like a "wild card" catchall and gets ALL requests. you shouldnt use wildcard, should be more speficic,  but we did just as an example
html.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../../public/index.html"));
  console.info(`${req.method} request received`);
});

module.exports = html;
