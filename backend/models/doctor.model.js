var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  firstName: String,
  lastName: String,
  speciality: String
});

module.exports = Doctor = mongoose.model('Doctor', doctorSchema );