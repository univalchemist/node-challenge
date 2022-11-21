const jwt = require("jsonwebtoken");
const rateLimit = require('express-rate-limit')
const config = process.env;

// Rate limit
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// middleware
const verifyToken = function (req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    if (config.DECODE_TEXT === decoded) {
      return next();
    } else {
      return res.status(401).send("Invalid Token");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

const checkIDInput = function (req, res, next) {  
  if(isNaN(req.params.id)) {
      res.status(400).json('Invalid ID supplied');
  } else {
      next();
  }
};
const checkIDExist = function(model) {
  return function (req, res, next) {
    if (!model)  res.status(400).json('Model not found');
    model.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Entity not found');
        }
    }); 
  };
};

module.exports = {
  verifyToken,
  checkIDInput,
  checkIDExist,
  limiter
}