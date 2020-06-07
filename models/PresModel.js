var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var medicineSchema = new Schema({
    id: String,
    name: String,
    quantity: Number
}, { versionKey: false, _id: false });

var schema = new Schema({
    customerId: String,
    fullname: String,
    diagnose: String,
    medicines: [medicineSchema],
    use: String,
    totalMoney: Number,
    doctorId: String,
    doctorName: String,
    createdDate : String
}, { versionKey: false });

module.exports = mongoose.model("prescriptions", schema);