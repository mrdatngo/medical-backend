var express = require("express");
var router = express.Router();
var DoctorController = require("../controllers/DoctorController")

router.post("/login", (req, res) => {
    return DoctorController.login(req, res);
})

module.exports = router;
