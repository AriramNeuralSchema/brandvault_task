// Book Model
const db = require("../config");

const getAllBooks = (page = 1, limit = 10) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    db.query(
      "SELECT * FROM books limit ?, ?",
      [offset, limit],
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

const getBookDetail = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM books where id = ?", [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const addBook = (body) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO books (name, author, mangerId, image, path, createdBy, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        body.name,
        body.author,
        body.mangerId,
        body.filename,
        body.filePath,
        body.userId,
        new Date(),
      ],
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

const updateBook = (body) => {
  if (!body.id) {
    return Promise.reject("Book ID is missing");
  }
  let query = "";
  let values = [];
  if (body.filename) {
    query =
      "UPDATE books SET name = ?, author = ?, mangerId = ?, image = ?, path = ?, modifiedBy = ?, modifiedAt = ? WHERE id = ?";
    values = [
      body.name,
      body.author,
      body.mangerId,
      body.filename,
      body.filePath,
      body.userId,
      new Date(),
      body.id,
    ];
  } else {
    query =
      "UPDATE books SET name = ?, author = ?, mangerId = ?, modifiedBy = ?, modifiedAt = ? WHERE id = ?";
    values = [
      body.name,
      body.author,
      body.mangerId,
      body.userId,
      new Date(),
      body.id,
    ];
  }
  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.query("delete FROM books where id = ?", [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getAllBooks,
  getBookDetail,
  addBook,
  deleteBook,
  updateBook,
};
