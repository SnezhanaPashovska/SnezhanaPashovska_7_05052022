const passwordSchema = require('../models/passwordSchema');

module.exports = (req, res, next) => {
  //check the validity of the password
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({ message: 'The password must contain between 8 to 30 characters, including at least one capital letter, a number and a special character' },
      alert("The password must contain between 8 to 30 characters, including at least one capital letter, a number and a special character"))
  } else {
    next();
  }
};