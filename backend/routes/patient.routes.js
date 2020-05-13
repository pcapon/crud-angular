var express = require('express');
var router = express.Router();
const patientController = require('../controllers/patient.controller');
const { patientValidationRules, validate } = require('../validators/validators.js')

router.get('/', patientController.get);

router.get('/:id', patientController.getOne);

router.post('/', patientValidationRules(), validate, patientController.add);

router.post('/:id', patientValidationRules(), validate, patientController.edit);

router.delete('/:id', patientController.remove);

module.exports = router;
