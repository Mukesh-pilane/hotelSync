const { body, param } = require("express-validator");

exports.validateAddRange = [
  body("startAmount")
    .notEmpty()
    .withMessage("start amount is required.")
    .isNumeric()
    .withMessage("start amount should be a number"),

  body("endAmount")
    .notEmpty()
    .withMessage("end amount is required.")
    .isNumeric()
    .withMessage("end amount should be number"),

  body("tokenPoints")
    .notEmpty()
    .withMessage("token points are required.")
    .isNumeric()
    .withMessage("Token Points should be the number"),
];

exports.validateUpdateRange = [
  param("id")
    .notEmpty()
    .withMessage("id is required.")
    .isNumeric()
    .withMessage("id should be the number"),

  body("tokenPoints")
    .notEmpty()
    .withMessage("token points are required.")
    .isNumeric()
    .withMessage("token points should be the number"),
];

