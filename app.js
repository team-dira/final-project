require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const indexRoutes = require('./routes/index');
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

app.use('/', indexRoutes);

app.listen(PORT, (req, res) => {
  console.log(`connected to port: ${PORT}`);
});

module.exports = app;
