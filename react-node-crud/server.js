require('dotenv').config();
// Required some moduel for the expres
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
var MongoClient = require('mongodb').MongoClient;
// Create express app
const app = express();

// Body parser 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());

import Crud from './routes/api/Crud';
// Excluding routes which is protected by CSURF token 
app.use('/api/web/curd', Crud);

// DB Config
const { mongoURI } = require('./config/keys');

const db = mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// User users route 
app.use('/api/crud', Crud);


const port = process.env.PORT || 5000;

//app.listen(port, () => console.log(`Server running on port aid ${port}`));
var server = app.listen(port, () => console.log(`Server running on port aid ${port}`));

module.exports = server;