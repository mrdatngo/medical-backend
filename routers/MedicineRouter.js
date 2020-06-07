var express = require("express");
var router = express.Router();
var MedicineController = require("../controllers/MedicineController")

router.get("/get-all", (req, res) => {
    return MedicineController.getAll(req, res);
})

router.get("/get-detail", (req, res) => {
    return MedicineController.getDetail(req, res);
})

router.post("/add", (req, res) => {
    return MedicineController.add(req, res);
})

router.put("/update", (req, res) => {
    return MedicineController.update(req, res);
})

router.delete("/delete", (req, res) => {
    return MedicineController.delete(req, res);
})


module.exports = router;
