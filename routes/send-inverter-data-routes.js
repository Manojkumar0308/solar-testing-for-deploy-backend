const express = require("express");
const inverterData = require('../controller/send-inverter-data');
const router = express.Router();


router.post('/send-inverter-data',inverterData.addInverterData );
module.exports = router