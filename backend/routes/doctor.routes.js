var express = require('express');
var router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const { doctorValidationRules, validate } = require('../validators/validators.js')

router.get('/', doctorController.get);

router.get('/full', doctorController.getFull);

router.get('/:id', doctorController.getOne);

router.post('/', doctorValidationRules(), validate, doctorController.add);

router.post('/:id', doctorValidationRules(), validate, doctorController.edit);

router.delete('/:id', doctorController.remove);

module.exports = router;

