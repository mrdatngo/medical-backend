var CustomerModel = require("../models/CustomerModel");
var Exception = require("../utils/ExceptionHandler");
var DbContext = require("../services/DbContext");

module.exports.getAll = (req, res) => {

    try {
        CustomerModel.find({}, (err, list) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else if (!list) {
                return Exception.notFound(res, "Customer not found!")
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

        CustomerModel.findOne({ _id: id }, (err, customer) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else if (!customer) {
                return Exception.notFound(res, "Customer not found!")
            } else {
                return res.status(200).json(customer)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}


module.exports.add = async (req, res) => {

    try {
        var customer = CustomerModel({
            fullname: req.body.fullname,
            phone: req.body.phone,
            class: req.body.class,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth,
            weight: req.body.weight,
            height: req.body.height
        })

        CustomerModel.create(customer, (err) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else {
                return res.status(200).json(customer)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}

module.exports.update = async (req, res) => {

    try {
        var id = req.query.id;
        let customer =
            await DbContext.getCustomerById(id)
                .catch(() => {
                    return undefined;
                });
        if (!customer) {
            return Exception.badRequest(res, "Customer is incorrect!");
        }

        customer.fullname = req.body.fullname;
        customer.phone = req.body.phone;
        customer.class = req.body.class;
        customer.address = req.body.address;
        customer.dateOfBirth = req.body.dateOfBirth;
        customer.weight = req.body.weight;
        customer.height = req.body.height;

        customer.save((err) => {
            if (err) {
                return Exception.internalServerError(res, error.message)
            } else {
                return res.status(200).json(customer)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}

module.exports.delete = async (req, res) => {

    try {
        var id = req.query.id;
        let customer =
            await DbContext.getCustomerById(id)
                .catch(() => {
                    return undefined;
                });
        if (!customer) {
            return Exception.badRequest(res, "Customer is incorrect!");
        }

        customer.remove((err) => {
            if (err) {
                return Exception.internalServerError(res, error.message)
            } else {
                return res.status(200).json({
                    "message": "Delete customer successfully!"
                })
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}