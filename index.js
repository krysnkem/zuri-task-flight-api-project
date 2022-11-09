//import express module
const express = require("express");
//import the flights.json
const flights = require("./flights.json");
//import the filesystem module
const fs = require("fs");
//the app interface from express
const app = express();

const { json } = require("express");
const routes = require("./routes/flightRoute");

//specifying the middleware
app.use(json());
app.use("/", routes);

//specifying our port number
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
