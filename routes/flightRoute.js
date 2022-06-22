const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');
const { json } = require("express");
router.use(json())
router.get('/', controller.example)
//1. Book a flight
router.post('/flights', controller.bookFlight )
//2. Get all Flight
router.get('/flights', controller.getAllFlights)
//3. Get a single Flight
router.get('/flights/:id', controller.getFlight)
//4. Update/Edit Flight
router.put('/flights/:id', controller.updateFlight)
//5. Delete Flight 
router.delete('/flights/:id', controller.deleteFlight)

module.exports = router;

