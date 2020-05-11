var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: String,
  lastName: String,
  age: String,
  sex: String,
  drugs: [{ type: Schema.Types.ObjectId, ref: 'Drug' }],
  treatments: Number
});

module.exports = Patient = mongoose.model('patientModel', patientSchema );