require("dotenv").config();
const { mongoURI } = require("./keys");
import mongoose from "mongoose";
const db = mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(""))
  .catch(err => console.log(err));

module.exports = db;
