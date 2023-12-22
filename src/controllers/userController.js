const User = require("../models/User");
const JWT = require("jsonwebtoken");
const jwtConfig = require("../auth/jwt-config");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: false,
      message: "Please Check Username, Password",
    });
  }
  try {
    const user = await User.login(req.body);
    if (user.length) {
      let token = JWT.sign({ user }, jwtConfig.Secret, {
        expiresIn: jwtConfig.expiresIn,
      });
      return res.status(200).json({
        status: true,
        message: "Login Successfullly",
        token,
        data: user,
      });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Wrong Username or Password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Please Try Again!.." });
  }
};

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({
      status: false,
      message: "Please Check Username, Password, and Role",
    });
  }
  try {
    const user = await User.registerUser(req.body);
    if (user?.insertId) {
      return res.status(200).json({
        status: true,
        message: "User Register Successfullly",
        data: user,
      });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Please Try Again!.." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Please Try Again!.." });
  }
};

module.exports = {
  login,
  registerUser,
};
