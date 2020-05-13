var express = require('express');
var router = express.Router();
const treatmentController = require('../controllers/treatment.controller');
const { treatmentValidationRules, validate } = require('../validators/validators.js')

router.get('/', treatmentController.get);

router.get('/:id', treatmentController.getOne);

router.post('/', treatmentValidationRules(), validate, treatmentController.add);

router.post('/:id', treatmentValidationRules(), validate, treatmentController.edit);

router.delete('/:id', treatmentController.remove);

module.exports = router;

