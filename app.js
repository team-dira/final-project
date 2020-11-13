require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const errorHandler = require('./middlewares/errorHandler');

const userPost = require('./routes/UserPost');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', userPost);
app.use(errorHandler);

module.exports = app;
