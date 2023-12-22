const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.registerUser);

module.exports = router;