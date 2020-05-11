var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
  start: String,
  end: String,
  test: String,
  doctor: String,
});

module.exports = Treatment = mongoose.model('treatmentModel', treatmentSchema );