//limit the number of providing an incorrect password
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  //account blocked for 15 minutes after the third try
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Your account has been blocked. You have entered an incorrect password 3 times in a row. Please wait 15 minutes and try again.",
})

module.exports = limiter;