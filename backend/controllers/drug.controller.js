const Drug = require("../models/drug.model");
const Patient = require("../models/patient.model");

exports.get = (req, res) => {
  Drug.find()
    .then((drugs) => res.json(drugs))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.getOne = (req, res) => {
  Drug.findById(req.params.id)
    .then((drugs) => res.json(drugs))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.add = (req, res) => {
  Drug.create({
    name: req.body.name,
    code: req.body.code,
  }).then((drug) => res.json(drug));
};

exports.edit = (req, res) => {
  Drug.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((drug) => res.json(drug))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.remove = (req, res) => {
  Drug.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => {
      Patient.updateMany(
        { drugs: req.params.id },
        { $pull: { drugs: req.params.id } }
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
