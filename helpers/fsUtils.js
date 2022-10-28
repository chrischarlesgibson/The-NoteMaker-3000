const fs = require("fs");
const util = require("util");

//on this page are the utils that will do some work for me so that server.js, html.js and api.js  can be more  modularized and clean. otherwise

// Promisified version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Function to write data to the JSON file given a destination (a string input) and some content (an object input here)
// destination is the file you want to write to.
//content is the content you want to write to the file.

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

//  Function to read data from a given a file and append some content
//  content is the content (object) you want to append to the file.
//   file is the path (string)  to the file you want to save to.

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
