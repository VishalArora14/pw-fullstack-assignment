const express = require("express");
const { getAllData, getAllCenter, getAllRooms } = require("./dataControllers");
const router = express.Router();

router.route("/getAllData").get(getAllData);
router.route("/getAllCenter").get(getAllCenter);
router.route("/getAllRooms").get(getAllRooms);

module.exports = router;