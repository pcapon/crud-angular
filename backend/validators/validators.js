const { body, param, validationResult } = require("express-validator");
const doctorValidationRules = () => {
  return [
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
    body("speciality").not().isEmpty(),
  ];
};

const drugValidationRules = () => {
  return [
    body("name").not().isEmpty(),
    body("code").not().isEmpty()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  doctorValidationRules,
  drugValidationRules,
  validate,
};
