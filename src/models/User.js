const db = require("../config");
var bcrypt = require("bcryptjs");

const login = (body) => {
  return new Promise((resolve, reject) => {
    const pwd = bcrypt.hashSync(
      body.password,
      "$2a$12$WbpWQ1YHInpRFTrovAZKM.anQEG9NREE0ZpT8Q4aVXvDf8TpAoF02"
    );
    db.query(
      "select * from users where username = ? and password = ?",
      [body.username, pwd],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const registerUser = (body) => {
  return new Promise((resolve, reject) => {
    const pwd = bcrypt.hashSync(
      body.password,
      "$2a$12$WbpWQ1YHInpRFTrovAZKM.anQEG9NREE0ZpT8Q4aVXvDf8TpAoF02"
    );
    db.query(
      "INSERT INTO users (username, password, roleId, createdBy, createdAt) VALUES (?, ?, ?, ?, ?)",
      [body.username, pwd, body.role, 1, new Date()],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  login,
  registerUser,
};
