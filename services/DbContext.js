var DoctorModel = require("../models/DoctorModel");
var CustomerModel = require("../models/CustomerModel");
var MedicineModel = require("../models/MedicineModel");
var PresModel = require("../models/PresModel");
var TimeUtils = require("../utils/TimeUtils");

module.exports.getDoctorLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        DoctorModel.findOne({ username: username, password: password }, (err, doctor) => {
            if (!err) {
                return resolve(doctor);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getDoctorByUsername = (username) => {
    return new Promise((resolve, reject) => {
        DoctorModel.findOne({ username: username }, (err, doctor) => {
            if (!err) {
                return resolve(doctor);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getDoctorById = (id) => {
    return new Promise((resolve, reject) => {
        DoctorModel.findOne({ _id: id }, (err, doctor) => {
            if (!err) {
                return resolve(doctor);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getAllCustomer = () => {
    return new Promise((resolve, reject) => {
        CustomerModel.find({}, (err, customers) => {
            if (!err) {
                return resolve(customers);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getCustomerById = (id) => {
    return new Promise((resolve, reject) => {
        CustomerModel.findOne({ _id: id }, (err, customer) => {
            if (!err) {
                return resolve(customer);
            } else {
                return reject(err);
            }
        })
    })
}


module.exports.getAllMedicine = () => {
    return new Promise((resolve, reject) => {
        MedicineModel.find({}, (err, medicines) => {
            if (!err) {
                return resolve(medicines);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getMedicineById = (id) => {
    return new Promise((resolve, reject) => {
        MedicineModel.findOne({ _id: id }, (err, medicine) => {
            if (!err) {
                return resolve(medicine);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getAllPres = () => {
    return new Promise((resolve, reject) => {
        PresModel.find({}, (err, presList) => {
            if (!err) {
                return resolve(presList);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getPresById = (id) => {
    return new Promise((resolve, reject) => {
        PresModel.findOne({ _id: id }, (err, pres) => {
            if (!err) {
                return resolve(pres);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getNumberPresToday = () => {
    return new Promise((resolve, reject) => {
        PresModel.countDocuments({ createdDate: TimeUtils.getTodayDate() }, (err, count) => {
            if (!err) {
                return resolve(count);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getNumberMedicine = () => {
    return new Promise((resolve, reject) => {
        MedicineModel.countDocuments({}, (err, count) => {
            if (!err) {
                return resolve(count);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getNumberMedicineOutStock = () => {
    return new Promise((resolve, reject) => {
        MedicineModel.countDocuments({ quantity: { $lt: 1 } }, (err, count) => {
            if (!err) {
                return resolve(count);
            } else {
                return reject(err);
            }
        })
    })
}

module.exports.getNumberCustomer = () => {
    return new Promise((resolve, reject) => {
        CustomerModel.countDocuments({}, (err, count) => {
            if (!err) {
                return resolve(count);
            } else {
                return reject(err);
            }
        })
    })
}