//requiring express
const express = require("express");

//declaring a new instance of express
const app = express();

//setting port equal to whatever port heroku want sto use or 3000
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded  data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for making this publicly accessible
app.use(express.static("public"));

//importing module routers
const htmlRouter = require("./routes/html");
const apiRouter = require("./routes/api");

//requiring app to use the modular routers
app.use("/api", apiRouter);
app.use("/", htmlRouter);

//telling app to listen at the speficied port and logging a message if it works
app.listen(process.env.port || 3000);
console.log(`Example app listening at http://localhost:${PORT}`);

module.exports = app;
