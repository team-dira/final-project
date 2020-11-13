function errorHandler(err, req, res, next) {
  console.log(err);
  if (err) {
    res.status(500).json({
      msg: 'internal server error',
    });
  }
}

module.exports = errorHandler;
