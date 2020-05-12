var express = require('express');
var router = express.Router();
const drugController = require('../controllers/drug.controller');
const { drugValidationRules, validate } = require('../validators/validators.js')

router.get('/', drugController.get);

router.get('/:id', drugController.getOne);

router.post('/', drugValidationRules(), validate, drugController.add);

router.post('/:id', drugValidationRules(), validate, drugController.edit);

router.delete('/:id', drugController.remove);

module.exports = router;
