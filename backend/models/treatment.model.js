var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
  start: String,
  end: String,
  text: { type: String, default: "" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
});

module.exports = Treatment = mongoose.model("Treatment", treatmentSchema);
