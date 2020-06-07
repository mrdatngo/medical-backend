var NewsModel = require("../models/NewsModel");
var Exception = require("../utils/ExceptionHandler");
var DbContext = require("../services/DbContext");


module.exports.getAll = (req, res) => {
    try {
        NewsModel.find({}, (err, newsList) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else {
                return res.status(200).json(newsList)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}

module.exports.getStatistic = async (req, res) => {
    try {
        let numberCustomer = await DbContext.getNumberCustomer()
            .catch(() => {
                return 0;
            });
        let numberMedicine = await DbContext.getNumberMedicine()
            .catch(() => {
                return 0;
            });
        let numberMedicineOutStock = await DbContext.getNumberMedicineOutStock()
            .catch(() => {
                return 0;
            });
        let numberPres = await DbContext.getNumberPresToday()
            .catch(() => {
                return 0;
            });
        return res.status(200).json({
            numberCustomer,
            numberMedicine,
            numberMedicineOutStock,
            numberPres
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}