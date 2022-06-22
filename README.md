# zuri-task-flight-api-project
A REST API project built with Node.js

With this API, you can :
1. Add/Book Flight
2. Get all Flight
3. Get a single Flight
4. Update/Edit Flight
5. Delete Flight

Additionional Features
1. When creating new flight, 
    => Checks whether there is an already existing flight with that id
2. When updating a flight  
    => Checks whether the flight id matches the request id varible

To create a new flight, test with this:

    {
        "id": 4,  
        "title": "flight to Chicago",  
        "time": "2am",  
        "price": 32000,  
        "date": "27-07-2022"  
    }

If you get a respone that the id already exist, then change the 'id' to a higher value
