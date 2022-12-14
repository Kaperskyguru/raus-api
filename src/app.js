require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

//Set up
app = express();
app.use(cors());
// Middlewares

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
require(path.join(__dirname, "routes.js"))(app);

app.get("/", (req, res) => {
  res.end("API under development");
});

// Starting Server
if (process.env.NODE_ENV === "test") {
} else app.listen(process.env.PORT || 8081);

module.exports = app;
