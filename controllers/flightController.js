//import the flights.json
const flights = require("../flights.json");
//import the filesystem module
const fs = require("fs");

exports.example = (req, res) => {
  console.log("example");
  res.send("Flight example");
};

//1. Add/Book Flight
exports.bookFlight = async (request, response) => {
  console.log("booking a Flight");
  //get the new flight from the request body
  const newFlight = request.body.newFlight;
  //check for duplicate id
  const duplicateIdIndex = flights.findIndex((flight) => {
    return newFlight.id == flight.id;
  });
  //if there is already a flight with this id return a messag that the flight id already exists
  if (duplicateIdIndex != -1) {
    return response
      .status(400)
      .json({ message: `flight with this id: ${newFlight.id} already exists` });
  }
  //if the newFlight id is greater than the id of the last flight on the flights.json then
  //tel lthe user to use the required id
  //tel lthe user to use the required id
  const idOfLastFlight = flights[flights.length - 1].id;
  if (newFlight.id > idOfLastFlight + 1) {
    return response.status(400).json({
      message: `the id of this flight details is not ideal, use the id ${
        idOfLastFlight + 1
      }`,
    });
  }
  //add new flight to flights array
  flights.push(newFlight);
  //stringify the updated flight array
  const stringData = JSON.stringify(flights, null, 2);
  //overwrite the flight.json with the updated-stringified array
  fs.writeFile("flights.json", stringData, (err) => {
    if (err) return response.status(500).json({ message: err.message });
  });
  console.log({ flights });
  return response
    .status(200)
    .json({ message: "new flight details created successfully!" });
};
//2. Get all Flight
exports.getAllFlights = (request, response) => {
  //get all fights in flights.json and return the whole file as a response
  return response.status(200).json(flights);
};

//5. Delete Flight
exports.deleteFlight = (request, response) => {
  console.log("deleting a flight");
  //get the id from the request body
  const id = request.params.id;
  //get the index of the flight objec having this id
  const index = flights.findIndex((flight) => {
    return String(flight.id) === id;
  });
  if (index != -1) {
    //remove the flight object from the flights array
    const removedFlight = flights.splice(index, 1);
    //log the removed flight to compare with the database
    console.log({ removedFlight });

    //overwrite the flights.json file with the updated flights array
    //stringify the flights array
    const stringData = JSON.stringify(flights, null, 2);
    fs.writeFile("flights.json", stringData, (err) => {
      if (err) return response.status(500).json({ message: err });
    });
    return response
      .status(200)
      .json({ message: "flight deleted successfully" });
  } else {
    return response.status(404).json({ message: "flight not found" });
  }
};

//3. Get a single Flight
exports.getFlight = (request, response) => {
  //get the id from the body of the request and find the object with that id and return that object in the response
  //get the id from request.param.id
  const id = request.params.id;

  //find the id of the object having this id
  const index = flights.findIndex((flight) => {
    return String(flight.id) === id;
  });
  //if a flight object with the this id exists, then return the object as a response
  //else return the response that file is not found
  if (index != -1) {
    return response.status(200).json(flights[index]);
  } else {
    return response.status(404).json({ message: "flight not found" });
  }
};

//4. Update/Edit Flight
exports.updateFlight = (request, response) => {
  console.log("updating a flight");
  //get the id of the target flight from the request body and the new flight object
  const id = request.params.id;
  const newFlight = request.body.newFlight;
  //check that the route id matches that of the new flight object
  if (String(id) !== String(newFlight.id)) {
    return response
      .status(400)
      .json({ message: "route id does not match flight id" });
  }
  //the index of the user with the that specific id,
  const index = flights.findIndex((flight) => {
    return String(flight.id) === id;
  });
  //if the user does not exist then return a error
  if (index != -1) {
    // update the entry at that index with the new flight from the put request
    flights[index] = newFlight;
    //confirm that updated entry
    console.log(flights[index]);
    //stringify the updated flights object and overwrite the flights.json
    const stringData = JSON.stringify(flights, null, 2);
    fs.writeFile("flights.json", stringData, (err) => {
      if (err) return response.status(500).json({ message: err });
    });
    return response
      .status(200)
      .json({ message: "flight details updated successfully!" });
  } else {
    return response.status(404).json({ message: "can not find flight" });
  }
};
