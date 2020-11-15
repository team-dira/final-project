const { User, UserPost } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


class Controller {
  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if (!user) {
          throw {
            msg: 'wrong email / password'
          }
        }
        else {
          const validPassword = bcrypt.compareSync(password, user.password)
          if (!validPassword) {
            throw {
              name: "invalid email / password"
            }
          } else {
            const access_token = jwt.sign({
              email: user.email,
              id: user.id
            }, process.env.JWT_SECRET)
            console.log(access_token)
            res.status(200).json({
              message: "Login Succeed",
              access_token: access_token,
              email: user.email
            })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static fetchUsers(req, res, next) {
    User.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static getPosts(req, res, next) {
    UserPost.findAll()
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getPostById(req, res, next) {
    UserPost.findOne({
      where: { id: +req.params.id }
    })
      .then(data => {
        if (data) {
          res.status(200).json(data)
        }
        else {
          throw {
            msg: 'cannot found'
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static createPost(req, res, next) {
    res.status(201).json({ msg: 'create post succeed' })
  }

  static delPostById(req, res, next) {
    const { id } = req.params
    UserPost.destroy({
      where: {
        id:id
      }
    })
      .then(_ => {
        res.status(200).json({
          msg: 'Delete succeed'
        })
      })
      .catch(err=>{
        next(err)
      })
  }
}

module.exports = Controller