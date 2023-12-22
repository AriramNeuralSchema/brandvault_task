const JWT = require("jsonwebtoken");
const jwtConfig = require("../auth/jwt-config");
module.exports = function (req, res, next) {
  let userToken = req.headers["authorization"];
  var error;
  if (userToken) {
    JWT.verify(userToken, jwtConfig.Secret, (err, decoded) => {
      if (err) {
        error = err;
        let data = { message: error.message, status: false };
        return res.status(400).send(data);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    //we dont have token
    let data = {
      message: "Session expired, Please login again",
      status: false,
    };
    res.status(400).send(data);
  }
};
