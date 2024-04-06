const { validationResult, body } = require("express-validator");
const Users = require('../models/user.model');

const validateRegisterInput = [
  body("fullname").notEmpty().withMessage("Username is required"),
  body("phoneNum").notEmpty().withMessage("Phone number is required"),
  body("phoneNum")
    .isMobilePhone("any")
    .withMessage("Invalid phone number format"),
  body("email")
    .isEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateLoginInput = [
    body("email")
    .isEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports= {validateLoginInput, validateRegisterInput, handleValidationErrors};
