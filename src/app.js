const express = require("express");
const app = express();
const bookRoutes = require("./routes/routes");
const userRoutes = require("./routes/users");

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/books", bookRoutes);
app.use("/user", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
