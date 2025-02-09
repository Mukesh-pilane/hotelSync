const { body } = require("express-validator");

exports.validateAddHotel = [
  body("name")
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name should be 3 to 50 characters long"),

  body("address")
    .isString()
    .withMessage("Address should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Address should be 3 to 50 characters long")
];