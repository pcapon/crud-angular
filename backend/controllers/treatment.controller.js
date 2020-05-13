const Treatment = require("../models/treatment.model");

exports.get = (req, res) => {
  Treatment.find()
    .populate({ path: "doctor", model: "Doctor" })
    .then((treatment) => res.json(treatment))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.getOne = (req, res) => {
  Treatment.findById(req.params.id)
    .populate({ path: "doctor", model: "Doctor" })
    .then((treatment) => res.json(treatment))
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.add = (req, res) => {
  Treatment.create({
    start: req.body.start,
    end: req.body.end,
    text: req.body.text,
    doctor: req.body.doctor,
  })
    .then((treatment) => {
      treatment
        .populate({ path: "doctor", model: "Doctor" })
        .execPopulate()
        .then((docpop) => res.json(docpop))
        .catch((error) => {
          res.status(409).json(error);
        });
    })
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.edit = (req, res) => {
  Treatment.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((treatment) => {
      treatment
        .populate({ path: "doctor", model: "Doctor" })
        .execPopulate()
        .then((docpop) => res.json(docpop))
        .catch((error) => {
          res.status(409).json(error);
        });
    })
    .catch((error) => {
      res.status(409).json(error);
    });
};

exports.remove = (req, res) => {
  Treatment.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
    .catch((error) => {
      res.status(409).json(error);
    });
};
