const { UserPost } = require('../models')

async function Authorization(req, res, next) {
  try {
    const data = await UserPost.findByPk(req.params.id)
    if (!data) {
      throw {
        msg: 'Not Found'
      }
    }

    if (data.UserId !== req.decodedUser.id) {
      res.status(400).json({
        msg: 'Unauthorized'
      })
    }
    else {
      next()
    }
    throw err
  }
  catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = Authorization