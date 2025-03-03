const { body, param } = require("express-validator");

exports.validateAddHotel = [
  body("name")
    .notEmpty()
    .withMessage("Hotel name is required")
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name should be 3 to 50 characters long"),

  body("address")
    .notEmpty()
    .withMessage("Hotel address is required")
    .isString()
    .withMessage("Address should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Address should be 3 to 50 characters long"),

  body("baseTokenPoints")
    .notEmpty()
    .withMessage("Hotel base token points is required")
    .isNumeric()
    .withMessage("Base Token Points should be the number"),
  
  body("redeemLimit")
    .notEmpty()
    .withMessage("redeem limit for token points is required")
    .isNumeric()
    .withMessage("redeem limit should be the number"),
];

exports.validateModifyHotel = [
  param("id")
      .notEmpty()
      .withMessage("id is required.")
      .isNumeric()
      .withMessage("id should be the number"),
    
  body("name")
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name should be 3 to 50 characters long"),

  body("address")
    .isString()
    .withMessage("Address should be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Address should be 3 to 50 characters long"),

  body("baseTokenPoints")
    .isNumeric()
    .withMessage("Base Token Points should be the number"),
  
  body("redeemLimit")
    .isNumeric()
    .withMessage("redeem limit should be the number"),
];