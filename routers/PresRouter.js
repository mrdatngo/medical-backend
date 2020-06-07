var express = require("express");
var router = express.Router();
var PresController = require("../controllers/PresController")

router.get("/get-all", (req, res) => {
    return PresController.getAll(req, res);
})

router.get("/get-detail", (req, res) => {
    return PresController.getDetail(req, res);
})

router.post("/add", (req, res) => {
    return PresController.add(req, res);
})

router.put("/update", (req, res) => {
    return PresController.update(req, res);
})

router.delete("/delete", (req, res) => {
    return PresController.delete(req, res);
})

router.get("/export", (req, res) => {
    return PresController.exportData(req, res);
});


module.exports = router;
