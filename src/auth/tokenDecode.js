const JWT = require("jsonwebtoken");
const jwtConfig = require("../auth/jwt-config");

const tokenDecode = (req) => {
  return JWT.verify(
    req.headers["authorization"],
    jwtConfig.Secret,
    (err, decoded) => {
      return decoded?.user[0];
    }
  );
};

module.exports = {
  tokenDecode,
};
