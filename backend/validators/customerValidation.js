const { body } = require("express-validator");

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

  body("belongsToHotel")
    .notEmpty()
    .withMessage("Hotel Id is required")
    .bail()
    .isNumeric()
    .withMessage("Hotel Id should be numeric"),
  
];

