const html = require("express").Router();

//declaring a port to use
const PORT = 3000;

//middleware to have it be accessible to everyone
app.use(express.static("public"));

// get request for notes html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  console.info(`${req.method} request received to get reviews`);
});

// get request for index html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  console.info(`${req.method} request received to get reviews`);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = html;
