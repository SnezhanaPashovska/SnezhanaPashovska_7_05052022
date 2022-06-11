//--RegEx du email--//
const checkEmail = require('email-validator');
var validator = require("email-validator");
validator.validate("test@email.com");

module.exports = (req, res, next) => {
  //checking of the validity of the email
  if (!checkEmail.validate(req.body.email)) {
    return res.status(400).json({ message: "Please enter a valid email address" },
      alert("Please enter a valid email address"));
  } else {
    next();
  }
};

