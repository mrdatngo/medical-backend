var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    title: String,
    description: String,
    image: String,
    link: String
}, { versionKey: false });

module.exports = mongoose.model("news", schema);