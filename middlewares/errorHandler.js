function errorHandler(err, req, res, next) {
  if (err.msg === 'Wrong email / password') {
    res.status(400).json({
      msg: err.msg
    })
  }
  else if (err.name === 'SequelizeValidationError') {
    res.status(400).json({ msg: err.errors[0].message })
  }
  else if (err.msg === 'Not Found') {
    res.status(404).json({
      msg: err.msg
    })
  }
  else if (err.msg === 'cannot access') {
    res.status(400).json(err)
  }
}

module.exports = errorHandler;
