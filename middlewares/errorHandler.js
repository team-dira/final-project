function errorHandler(err, req, res) {
  if (err.msg === 'Wrong email / password') {
    res.status(400).json({
      error: err.msg
    })
  }
  else if (err.msg === 'SequelizeValidationError') {
    res.status(400).json({
      error: err.msg
    })
  }
}

module.exports = errorHandler;
