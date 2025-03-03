const { body, param } = require("express-validator");

exports.validateAddPermission = [
  body("actionName")
    .notEmpty()
    .withMessage("action name is required")
    .isString()
    .withMessage("action name should be a string"),

  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description should be a string"),

  body("baseUrl")
    .notEmpty()
    .withMessage("base url is required")
    .isString()
    .withMessage("base url should be a string"),
  
  body("path")
    .notEmpty()
    .withMessage("path is required")
    .isString()
    .withMessage("path should be a string"),

  body("method")
    .notEmpty()
    .withMessage("method is required")
    .isString()
    .withMessage("method should be a string"),

];

exports.validateModifyPermission = [
  param("id")
    .notEmpty()
    .withMessage("id is required.")
    .isNumeric()
    .withMessage("id should be the number"),
    
  body("actionName")
    .notEmpty()
    .withMessage("action name is required")
    .isString()
    .withMessage("action name should be a string"),

  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description should be a string"),

  body("baseUrl")
    .notEmpty()
    .withMessage("base url is required")
    .isString()
    .withMessage("base url should be a string"),
  
  body("path")
    .notEmpty()
    .withMessage("path is required")
    .isString()
    .withMessage("path should be a string"),

  body("method")
    .notEmpty()
    .withMessage("method is required")
    .isString()
    .withMessage("method should be a string"),

];