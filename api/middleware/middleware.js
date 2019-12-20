const jwt = require("jsonwebtoken");

module.exports = {
  validateUser,
  validateRegister,
  signToken,
};

//MIDDLEWARE
function validateUser(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res.status(400).json({ message: "Please provide username and password" });
  }
}

function validateRegister(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res.status(400).json({ message: "Please provide username and password" });
  }
}

//TOKEN
function signToken(user) {
  const payload = {
    sub: user.id,
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}
