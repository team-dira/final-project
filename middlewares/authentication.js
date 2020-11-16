const jwt = require(`jsonwebtoken`)
const { User } = require(`../models`)

async function authentication(req, res, next) {

  try {
    if (!req.headers.access_token) {
      throw {
        msg: 'cannot access'
      }
    }
    else {
      let decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
      if (decoded) {
        const userData = await User.findByPk(decoded.id)
        if (userData) {
          req.decodedUser = decoded
          next()
        }
        else {
          throw err
        }
      }
      else {
        throw err
      }
    }
  }
  catch (err) {
    console.log(err)
    next(err)
  }

}

module.exports = authentication

