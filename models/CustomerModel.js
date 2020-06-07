var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    fullname: String,
    phone: String,
    class: String,
    address: String,
    dateOfBirth: String,
    weight: Number,
    height: Number
}, { versionKey: false });

module.exports = mongoose.model("customers", schema);