require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import db from "./config/connection";
const app = express();

// DB Config file
const { mongoURI } = require("./config/keys");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

import Crud from "./routes/api/Crud";

/*// Crud APIs containe create, update, deleting record
app.use("/api/web/curd", Crud);*/

// User users route
app.use("/api/crud", Crud);

// If env variable is present or listen to port 5000
const port = process.env.PORT || 5000;

// Listen to the server
var server = app.listen(port, () =>
  console.log(`Server running on port aid ${port}`)
);

// Export server module
module.exports = server;
