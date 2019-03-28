var express = require("express");
var router = express.Router();
var resController = require("./resController");

router.post("/getRes", resController.getRes);
router.post("/createRes", resController.createRes);
router.post('/search',resController.search)
module.exports = router;
