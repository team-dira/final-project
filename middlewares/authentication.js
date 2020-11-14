const jwt = require(`jsonwebtoken`)
const { User } = require(`../models`)

function authentication(req, res, next) {
  if (!req.headers.access_token) {
    res.status(401).json('cannot authenticate')
  }
  else {
    try {
      let payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
      User.findOne({
        where: { id: payload.id }
      })
        .then(user => {
          if (user) {
            req.decodedUser = payload
            next()
          }
          else {
            throw {
              msg: 'canoot access'
            }
          }
        })
        .catch(err => {
          next(err)
        })
    }
    catch (err) {
      res.status(400).json({ msg: 'cannot access' })
    }
  }
}

module.exports = authentication

