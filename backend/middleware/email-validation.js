//--RegEx du email--//
const checkEmail = require('email-validator');
var validator = require("email-validator");
validator.validate("test@email.com");

module.exports = (req, res, next) => {
  if (!checkEmail.validate(req.body.email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  } else {
    next();
  }
};

