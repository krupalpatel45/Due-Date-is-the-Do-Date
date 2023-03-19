const express = require("express");
const { isSignedin } = require("../Controllers/authenticate");

var router = express.Router()
const { drive, ride, cancelTrip, tripDone, tripHistory, activeTrip, isDriver, trips, 
    requestRide, driveRequests, rideRequests, updateRequest } = require("../Controllers/trip.js");

router.post("/trip/drive", isSignedin, drive)  // Swagger Api done
router.post("/trip/ride", isSignedin, ride)
router.post("/trip/request", isSignedin, requestRide)    //Swagger Api done
router.delete("/trip", isSignedin, cancelTrip) // Swagger Api pending
router.post("/trip/done", isSignedin, tripDone) // Swagger Api pending
router.get("/trip/history", isSignedin, tripHistory)// Swagger Api pending
router.get("/trip/isdriver", isSignedin, isDriver) 
router.get("/trip/activetrip", isSignedin, activeTrip)
router.post("/trips/", isSignedin, trips)
router.post("/drive/requests/", isSignedin, driveRequests)
router.post("/ride/requests/", isSignedin, rideRequests)
router.post("/update/request/", isSignedin, updateRequest)
module.exports = router;
