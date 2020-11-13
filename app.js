const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app runs at port ${port}`);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
