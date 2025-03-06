const { body, param } = require("express-validator");

exports.validateAddCustomer = [
  body("firstName")
    .isString()
    .withMessage("firstName should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("firstName should be 3 to 50 characters long"),

  body("lastName")
    .isString()
    .withMessage("lastName should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("lastName should be 3 to 50 characters long"),

  body("mobile")
    .notEmpty()
    .withMessage("Mobile Number is required")
    .bail()
    .isString()
    .withMessage('Mobile number must be a string')
    .isLength({ min: 10, max:10 })
    .withMessage("Mobile number must be exactly 10 digits"),

  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .bail()
    .isNumeric()
    .withMessage("amount should be numeric"),
  
];

exports.validateUpdateCustomer = [
    param("id")
    .notEmpty()
    .withMessage("customer id is required")
    .bail()
    .isNumeric()
    .withMessage("customer Id should be numeric"),

    body("firstName")
    .optional()
    .isString()
    .withMessage("firstName should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("firstName should be 3 to 50 characters long"),

    body("lastName")
      .optional()
      .isString()
      .withMessage("lastName should be a string")
      .isLength({ min: 3, max: 50 })
      .withMessage("lastName should be 3 to 50 characters long"),

    body("mobile")
      .optional()
      .isString()
      .withMessage('Mobile number must be a string')
      .isLength({ min: 10, max:10 })
      .withMessage("Mobile number must be exactly 10 digits"),
];

exports.validateAddTransaction = [
  body("customerId")
    .notEmpty()
    .withMessage("customer id is required")
    .bail()
    .isNumeric()
    .withMessage("customer Id should be numeric"),

  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .bail()
    .isNumeric()
    .withMessage("amount should be numeric"),

  body("redeemedPoints")
    .optional()
    .bail()
    .isNumeric()
    .withMessage("redeem points should be numeric"),
];

exports.validateUpdateTransaction = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .bail()
    .isNumeric()
    .withMessage("Id should be numeric"),

  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .bail()
    .isNumeric()
    .withMessage("amount should be numeric"),

  body("redeemedPoints")
    .optional()
    .bail()
    .isNumeric()
    .withMessage("redeem points should be numeric"),
];


