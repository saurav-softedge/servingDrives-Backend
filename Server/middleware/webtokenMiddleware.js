const jwt = require("jsonwebtoken");

exports.createToken = (id) => {
  return jwt.sign({ id }, "qwertyuioplkjhgfdsazxcvbnm", {
    expiresIn: 3600,
  });
};
