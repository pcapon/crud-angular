const Doctor = require("../models/doctor.model");
const Treatment = require("../models/treatment.model");
const Patient = require("../models/patient.model");

exports.get = (req, res) => {
  Doctor.find()
    .then((doctor) => res.json(doctor))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.getOne = (req, res) => {
  Doctor.findById(req.params.id)
    .then((doctor) => res.json(doctor))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.add = (req, res) => {
  Doctor.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    speciality: req.body.speciality,
  }).then((doctor) => res.json(doctor));
};

exports.edit = (req, res) => {
  Doctor.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((doctor) => res.json(doctor))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.remove = (req, res) => {
  Doctor.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => {
      Treatment.updateMany(
        { doctor: req.params.id },
        { $pull: { doctor: req.params.id } }
      )
        .exec()
        .then(() => {
          res.sendStatus(204);
        });
    })
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.getFull = async (req, res) => {
  let fullResponse = [];
  const doctors = await Doctor.find().exec();
  for (const doctor of doctors) {
    const treatments = await Treatment.find({ doctor: doctor._id }).exec();
    tmpTreatments = [];
    for (const treatment of treatments) {
      patients = await Patient.find({ treatments: treatment._id }).exec()
      tmpTreatments.push({
        treatment,
        patients: patients
      })
    }
    fullResponse.push({
      doctor,
      treatments : tmpTreatments
    });
  }
  res.status(200).json(fullResponse);
};
