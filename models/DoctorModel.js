var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    username: String,
    password: String,
    fullName: String
}, { versionKey: false });

module.exports = mongoose.model("doctors", schema);