const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../auth/autuValidation");
const multer = require("multer");

router.get("/", authMiddleware, bookController.getAllBooks);
router.get("/get/:id", authMiddleware, bookController.getBookDetail);
router.post(
  "/add",
  authMiddleware,
  multer().any(),
  bookController.handleImage,
  bookController.addBooks
);
router.post(
  "/update",
  authMiddleware,
  multer().any(),
  bookController.uploadImage,
  bookController.updateBook
);
router.delete("/delete/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
