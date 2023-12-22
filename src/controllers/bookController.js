const Book = require("../models/Book");
const multer = require("multer");
const path = require("path");
const trokenDecode = require("../auth/tokenDecode").tokenDecode;
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks(req.body?.page, req.body?.limit);
    res.json(books);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Please Try Again!.." });
  }
};

const getBookDetail = async (req, res) => {
  if (!req.params?.id) {
    return res
      .status(400)
      .json({ status: false, message: "Book Id is Missing" });
  }
  try {
    const book = await Book.getBookDetail(req.params?.id);
    return res.status(200).json({
      status: true,
      message: "Book Details",
      data: book,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Please Try Again!.." });
  }
};

const addBooks = async (req, res) => {
  const tokenData = trokenDecode(req);
  const { name, mangerId, author } = req.body;
  let filePath = req.file.destination + "/" + req.file.filename;
  filePath = filePath.substring(1);
  const filename = req.file.originalname;
  if (!name || !mangerId || !author) {
    return res.status(400).json({
      status: false,
      message: "Please Check Required Fields",
    });
  }
  try {
    let params = {
      name,
      author,
      mangerId,
      filePath,
      filename,
      userId: tokenData.id,
    };
    const book = await Book.addBook(params);
    if (book?.insertId) {
      return res.status(200).json({
        status: true,
        message: "Book Add Successfullly",
      });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Please Try Again!.." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Please Try Again!.." });
  }
};

const updateBook = async (req, res) => {
  const tokenData = trokenDecode(req);
  const { id, name, mangerId, author } = req.body;
  if (!name || !mangerId || !author) {
    return res.status(400).json({
      status: false,
      message: "Please Check Required Fields",
    });
  }
  let filename,
    filePath = "";
  if (!req.file && !req.files) {
    filePath = req?.file?.destination + "/" + req?.file?.filename;
    filePath = filePath.substring(1);
    filename = req?.file?.originalname;
  }
  try {
    let params = {
      id,
      name,
      author,
      mangerId,
      filePath,
      filename,
      userId: tokenData.id,
    };
    const book = await Book.updateBook(params);
    if (book) {
      return res.status(200).json({
        status: true,
        message: "Book Update Successfullly",
      });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Please Try Again!.." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Please Try Again!.." });
  }
};
const deleteBook = async (req, res) => {
  if (!req.params?.id) {
    return res
      .status(400)
      .json({ status: false, message: "Book Id is Missing" });
  }
  try {
    const book = await Book.deleteBook(req.params?.id);
    return res.status(200).json({
      status: true,
      message: "Book Delete Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Please Try Again!.." });
  }
};

const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const eventUpload = multer({
  storage: eventStorage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype.toLowerCase());
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

const handleImage = (req, res, next) => {
  eventUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ status: false, message: "Please Try Again!.." });
    } else if (err) {
      return res
        .status(500)
        .json({ status: false, message: "Please Try Again!.. " });
    } else if (!req.file && !req.files) {
      return res
        .status(400)
        .json({ status: false, message: "Image is missing" });
    } else next();
  });
};

const uploadImage = (req, res, next) => {
  console.log(req.file, req.files);
  if (req.file && req.files) {
    eventUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ status: false, message: "Please Try Again!.." });
      } else if (err) {
        return res
          .status(500)
          .json({ status: false, message: "Please Try Again!.." });
      } else next();
    });
  } else next();
};

module.exports = {
  getAllBooks,
  getBookDetail,
  addBooks,
  handleImage,
  deleteBook,
  uploadImage,
  updateBook,
};
