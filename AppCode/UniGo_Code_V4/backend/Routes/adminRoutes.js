const express = require("express");
const {deleteuserbyid,deleteuserbyname_email} = require("../Controllers/adminroutes.js");
var router = express.Router()

router.get("/deleteuserbyid", deleteuserbyid)
router.get("/deleteusernamemail", deleteuserbyname_email)
module.exports = router;