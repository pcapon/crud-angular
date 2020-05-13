const Patient = require("../models/patient.model");

exports.get = (req, res) => {
  Patient.find()
    .then((patient) => res.json(patient))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.getOne = (req, res) => {
  Patient.findById(req.params.id)
    .then((patient) => res.json(patient))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.add = (req, res) => {
  Patient.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    sex: req.body.sex,
    drugs: req.body.drugs,
    treatments: req.body.treatments
  }).then((patient) => res.json(patient));
};

exports.edit = (req, res) => {
  Patient.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((patient) => res.json(patient))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.remove = (req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
    .catch((error) => {
      res.status(409).json(error);
    });
};
