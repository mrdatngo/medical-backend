var PresModel = require("../models/PresModel");
var Exception = require("../utils/ExceptionHandler");
var DbContext = require("../services/DbContext");
var TimeUtils = require("../utils/TimeUtils");
var Excel = require("exceljs");

module.exports.getAll = (req, res) => {

    try {
        PresModel.find({}, (err, list) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else if (!list) {
                return Exception.notFound(res, "Presciption not found!")
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

        PresModel.findOne({ _id: id }, (err, customer) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else if (!customer) {
                return Exception.notFound(res, "Presciption not found!")
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
        let doctorId = req.body.doctorId;
        let doctor =
            await DbContext.getDoctorById(doctorId)
                .catch(() => {
                    return undefined;
                });
        if (!doctor) {
            return Exception.badRequest(res, "DoctorId is incorect!")
        }

        let customerId = req.body.customerId;
        let customer =
            await DbContext.getCustomerById(customerId)
                .catch(() => {
                    return undefined;
                });
        if (!customer) {
            return Exception.badRequest(res, "CustomerId is incorect!")
        }

        let medicines = req.body.medicines;
        let totalMoney = 0;
        for (let i = 0; i < medicines.length; i++) {
            let id = medicines[i].id;
            let medicine =
                await DbContext.getMedicineById(id)
                    .catch(() => {
                        return undefined;
                    });
            if (!medicine) {
                return Exception.badRequest(res, "MedicineId is incorect!")
            } else {
                if (medicine.quantity < medicines[i].quantity) {
                    return Exception.badRequest(res, medicine)
                } else {
                    medicine.quantity -= medicines[i].quantity;
                    await medicine.save((e) => {
                        if (e) {
                            return Exception.internalServerError(res, e.message)
                        }
                    })
                    totalMoney += medicine.price * medicines[i].quantity;
                    medicines[i].name = medicine.name;
                }
            }
        }

        var pres = PresModel({
            customerId,
            fullname: customer.fullname,
            diagnose: req.body.diagnose,
            medicines,
            use: req.body.use,
            totalMoney,
            doctorId,
            doctorName: doctor.fullName,
            createdDate: TimeUtils.getTodayDate()
        })

        PresModel.create(pres, (err) => {
            if (err) {
                return Exception.internalServerError(res, err.message)
            } else {
                return res.status(200).json(pres)
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}

module.exports.delete = async (req, res) => {

    try {
        var id = req.query.id;
        let pres =
            await DbContext.getPresById(id)
                .catch(() => {
                    return undefined;
                });
        if (!pres) {
            return Exception.badRequest(res, "Prescription is incorrect!");
        }

        pres.remove((err) => {
            if (err) {
                return Exception.internalServerError(res, error.message)
            } else {
                return res.status(200).json({
                    "message": "Delete prescription successfully!"
                })
            }
        })
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}

module.exports.exportData = async (req, res) => {
    try {
        var prescriptions = await PresModel.find({}).exec().then((data) => { return data; });

        var workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet("Danh sách đơn thuốc");
        worksheet.columns = [
            { header: "Bệnh nhân", key: "fullname", width: 26 },
            { header: "Chẩn đoán", key: "diagnose", width: 56 },
            { header: "Đơn thuốc", key: "medicineString", width: 56 },
            { header: "Cách sử dụng", key: "use", width: 56 },
            { header: "Tổng tiền", key: "totalMoney", width: 16 },
            { header: "Nhân viên y tế kê đơn", key: "doctorName", width: 26 },
            { header: "Ngày tạo", key: "createdDate", width: 16 }
        ];

        for (let i = 0; i < worksheet.columnCount; i++) {
            var cell = `${String.fromCharCode(65 + i)}1`;
            worksheet.getCell(cell).font = {
                bold: true,
                color: { rgb: "ff0000" }
            };
        }

        for (let pres of prescriptions) {
            let medicines = pres.medicines
            let medicineString = ""
            for (let medicine of medicines) {
                medicineString += medicine.name + " - SL: " + medicine.quantity + " viên. "
            }
            pres.medicineString = medicineString
            worksheet.addRow(pres);
        }
        var file_name = `Danh_sach_don_thuoc_${TimeUtils.getTodayDate2()}.xlsx`;
        res.setHeader("content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=${file_name}`);
        await workbook.xlsx.write(res);
        res.status(200).end();

    } catch (err) {
        return Exception.internalServerError(res);
    }
};