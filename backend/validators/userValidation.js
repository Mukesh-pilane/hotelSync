const { body } = require("express-validator");

const passwordRegrex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

exports.validateAddUser = [
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

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .matches(passwordRegrex)
    .withMessage(
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character"
    ),

  body("roleId")
    .notEmpty()
    .withMessage("roleId is required")
    .bail()
    .isNumeric()
    .withMessage("roleId should be numeric"),
  
  body("hotelId")
    .notEmpty()
    .withMessage("roleId is required")
    .bail()
    .isNumeric()
    .withMessage("roleId should be numeric"),
];

exports.validateUpdatePassword = [
  body("mobile")
    .notEmpty()
    .withMessage("Mobile Number is required")
    .bail()
    .isNumeric()
    .withMessage('Mobile number must be a number')
    .isLength({ min: 10, max:10 })
    .withMessage("Mobile number must be exactly 10 digits"),

  body("newPassword")
    .notEmpty()
    .withMessage("New Password is required")
    .bail()
    .matches(passwordRegrex)
    .withMessage(
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character"
    ),

  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isNumeric()
    .withMessage("OTP should be the number"),
];
