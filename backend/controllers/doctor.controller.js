const Doctor = require("../models/doctor.model");

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
    .then(() => res.sendStatus(204))
    .catch((error) => {
      res.status(409).json(error);
    });
};
