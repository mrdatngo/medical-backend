var MedicineModel = require("../models/MedicineModel");
var Exception = require("../utils/ExceptionHandler");
var DbContext = require("../services/DbContext");

module.exports.getAll = (req, res) => {

    try {
        MedicineModel.find({}, (err, list) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else if (!list) {
                return Exception.notFound(res, "Medicine not found!")
            } else {
                return res.status(200).json(list)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}

module.exports.getDetail = (req, res) => {

    try {
        let id = req.query.id;

        MedicineModel.findOne({ _id: id }, (err, medicine) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else if (!medicine) {
                return Exception.notFound(res, "Medicine not found!")
            } else {
                return res.status(200).json(medicine)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}


module.exports.add = async (req, res) => {

    try {
        var medicine = MedicineModel({
            name: req.body.name,
            use: req.body.use,
            producer: req.body.producer,
            distributor: req.body.distributor,
            expiredDate: req.body.expiredDate,
            quantity: req.body.quantity,
            note: req.body.note,
            price: req.body.price
        })

        MedicineModel.create(medicine, (err) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else {
                return res.status(200).json(medicine)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}

module.exports.update = async (req, res) => {

    try {
        var id = req.query.id;
        let medicine =
            await DbContext.getMedicineById(id)
                .catch(() => {
                    return undefined;
                });
        if (!medicine) {
            return Exception.badRequest(res, "Medicine is incorrect!");
        }

        medicine.name = req.body.name;
        medicine.use = req.body.use;
        medicine.producer = req.body.producer;
        medicine.distributor = req.body.distributor;
        medicine.expiredDate = req.body.expiredDate;
        medicine.quantity = req.body.quantity;
        medicine.note = req.body.note;
        medicine.price = req.body.price

        medicine.save((err) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else {
                return res.status(200).json(medicine)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}

module.exports.delete = async (req, res) => {

    try {
        var id = req.query.id;
        let medicine =
            await DbContext.getMedicineById(id)
                .catch(() => {
                    return undefined;
                });
        if (!medicine) {
            return Exception.badRequest(res, "Medicine is incorrect!");
        }


        medicine.remove((err) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else {
                return res.status(200).json({
                    "message": "Delete medicine successfully!"
                })
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}