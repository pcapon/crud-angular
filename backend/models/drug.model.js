var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  name: String,
  code: String,
});

module.exports = Drug = mongoose.model('Drug', drugSchema );