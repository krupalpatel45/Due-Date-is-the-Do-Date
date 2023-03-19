/* temporary route to get all the user information*/
//import express from "express";
const express = require("express");
//import {allusersRoutes} from "../Controllers/allusersRoutes.js";
const { allusersRoutes, userDetails } = require("../Controllers/allusersRoutes.js");
var router = express.Router()

router.get("/users", allusersRoutes)
router.get("/user/details", userDetails)
module.exports = router;
//export default router;