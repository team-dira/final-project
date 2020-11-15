const { UserPost } = require('../models')

function Authorization(req, res, next) {
  const id = req.params.id
  UserPost.findByPk(id)
    .then(post => {
      if (post === null) {
        throw {
          msg: 'Not found'
        }
      }
      else {
        if(post.UserId === req.decodedUser.id){
          next()
        }
        else{
          throw {
            msg: 'Unauthorized'
          }
        }
      }
    })
    .catch(err=>{
      next(err)
    })
}

module.exports = Authorization