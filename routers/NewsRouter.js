var express = require("express");
var router = express.Router();
var NewsController = require("../controllers/NewsController")

router.get("/get-all", (req, res) => {
    return NewsController.getAll(req, res);
})

router.get("/get-statistic", (req, res) => {
    return NewsController.getStatistic(req, res);
})

module.exports = router;
