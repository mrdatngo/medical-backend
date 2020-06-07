var express = require("express");
var router = express.Router();
var CustomerController = require("../controllers/CustomerController")

router.get("/get-all", (req, res) => {
    return CustomerController.getAll(req, res);
})

router.get("/get-detail", (req, res) => {
    return CustomerController.getDetail(req, res);
})

router.post("/add", (req, res) => {
    return CustomerController.add(req, res);
})

router.put("/update", (req, res) => {
    return CustomerController.update(req, res);
})

router.delete("/delete", (req, res) => {
    return CustomerController.delete(req, res);
})


module.exports = router;
