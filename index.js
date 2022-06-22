//import express module
const express = require("express");
//import the flights.json
const flights = require("./flights.json");
//import the filesystem module
const fs = require('fs');


//the app interface from express
const app = express();
//specifying the middleware
app.use(express.json());


//1. Add/Book Flight
app.post('/flights', (request, response)=>{
  //get the new flight from the request body and save in the imported flights
  //then stringify the updated flights array and overwrite the existing flights.json file using filesystem

  //get the new flight from the request body
  const newFlight = request.body.newFlight
  //check for duplicate id
  const duplicateIdIndex = flights.findIndex((flight)=>{
    return String(newFlight.id) == flight.id
  })
  //if there is already a flight with this id return a messag that the flight id already exists
  if(duplicateIdIndex != -1){
    return response.status(400).json({message:`flight with this id: ${newFlight.id} already exists`})
  }
  //add new flight to flights array
  flights.push(newFlight)
  //stringify the updated flight array
  const stringData = JSON.stringify(flights, null, 2);
  //overwrite the flight.json with the updated-stringified array
  fs.writeFile('flights.json', stringData, (err)=>{
    if(err) return response.status(500).json({message:err})
  })
  console.log({flights})
  return response.status(200).json({message:"new flight details created successfully!"})
});


//2. Get all Flight
app.get('/flights', (request, response)=>{
  //get all fights in flights.json and return the whole file as a response
  return response.status(200).json(flights)
});


//3. Get a single Flight
app.get('/flights/:id', (request, response)=>{
  //get the id from the body of the request and find the object with that id and return that object in the response
  //get the id from request.param.id
  const id = request.params.id

  //find the id of the object having this id
  const index = flights.findIndex((flight)=>{
    return String(flight.id) === id
  })
  //if a flight object with the this id exists, then return the object as a response
  //else return the response that file is not found
  if(index != -1){
    return response.status(200).json(flights[index])
  }else{
    return response.status(404).json({message: "flight not found"})
  }
});


//4. Update/Edit Flight
app.put('/flights/:id', (request, response)=>{
  //get the id of the target flight from the request body and the new flight object
  const id = request.params.id
  const newFlight = request.body.newFlight
  //check that the route id matches that of the new flight object
  if(String(id) !== String(newFlight.id)){
    return response.status(400).json({message:"route id does not match flight id"})
  }
  //the index of the user with the that specific id, 
  const index = flights.findIndex((flight)=>{
    return String(flight.id)  === id
  })
  //if the user does not exist then return a error
  if(index != -1){
     // update the entry at that index with the new flight from the put request 
     flights[index] = newFlight
     //confirm that updated entry
     console.log(flights[index])
     //stringify the updated flights object and overwrite the flights.json
     const stringData = JSON.stringify(flights, null, 2)
     fs.writeFile('flights.json', stringData, (err)=>{
      if(err) return response.status(500).json({message:err})
     })
     return response.status(200).json({message:"flight details updated successfully!"})
  }
  else{
    return response.status(404).json({message:"can not find flight"})
  }
 

});


//5. Delete Flight 
app.delete('/flights/:id', (request, response) =>{
  //get the id from the request body
  const id = request.params.id
  //get the index of the flight objec having this id
  const index = flights.findIndex((flight)=>{
    return String(flight.id) === id
  })
  if(index != -1){
      //remove the flight object from the flights array
    const removedFlight =  flights.splice(index,1)
    //log the removed flight to compare with the database
    console.log({removedFlight})

    //overwrite the flights.json file with the updated flights array
    //stringify the flights array 
    const stringData = JSON.stringify(flights, null, 2)
    fs.writeFile('flights.json', stringData, (err)=>{
      if(err) return response.status(500).json({message: err})
    })
    return response.status(200).json({message:"flight deleted successfully"})

  }
})





const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
