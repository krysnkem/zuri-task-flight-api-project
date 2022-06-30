# zuri-task-flight-api-project
A REST API project built with Node.js

With this API, you can :
1. Add/Book Flight : PUT /flights
2. Get all Flight:   GET   /flights
3. Get a single Flight : GET    /flights/:id
4. Update/Edit Flight : POST    /flights/:id
5. Delete Flight: POST   /flights/:id

Additionional Features
1. When creating new flight    
    => Checks for an already existing flight with that id
2. When updating a flight  
    => Checks if flight id matches the request id

To create a new flight, test with this:

    {
        "id": 4,  
        "title": "flight to Chicago",  
        "time": "2am",  
        "price": 32000,  
        "date": "27-07-2022"  
    }

If you get a respone that the id already exist, then change the 'id' to a higher value
========================================
This api is now hosted on heroku at https://flights-booking-api.herokuapp.com/
