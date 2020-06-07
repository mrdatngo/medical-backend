var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    use: String,
    producer: String,
    distributor: String,
    expiredDate: String,
    quantity: Number,
    note: String,
    price: Number
}, { versionKey: false });

module.exports = mongoose.model("medicines", schema);