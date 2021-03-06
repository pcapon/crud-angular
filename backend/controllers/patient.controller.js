const Patient = require("../models/patient.model");

exports.get = (req, res) => {
  Patient.find()
    .populate({
      path: "drugs treatments",
      populate: {
        path: "doctor",
      },
    })
    .then((patient) => res.json(patient))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.getOne = (req, res) => {
  Patient.findById(req.params.id)
    .populate({
      path: "drugs treatments",
      populate: {
        path: "doctor",
      },
    })
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
    treatments: req.body.treatments,
  })
    .then((patient) => {
      patient
        .populate({
          path: "drugs treatments",
          populate: {
            path: "doctor",
          },
        })
        .execPopulate()
        .then((patientPop) => res.json(patientPop))
        .catch((error) => {
          res.status(409).json(error);
        });
    })
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.edit = (req, res) => {
  Patient.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((patient) => {
      patient
        .populate({
          path: "drugs treatments",
          populate: {
            path: "doctor",
          },
        })
        .execPopulate()
        .then((patientPop) => res.json(patientPop))
        .catch((error) => {
          res.status(409).json(error);
        });
    })
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
