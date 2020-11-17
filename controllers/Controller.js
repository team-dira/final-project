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
        console.log(user)
        if (!user) {
          console.log('err')
          throw {
            msg: 'Wrong email / password'
          }
        }
        else {
          console.log('masuk')
          const validPassword = bcrypt.compareSync(password, user.password)
          if (!validPassword) {
            throw {
              msg: "Wrong email / password"
            }
          } else {
            console.log('masuk jwt')
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

  static fetchUsers(req, res) {
    User.findAll()
      .then(data => {
        res.status(200).json(data)
      })
  }

  static getPosts(req, res) {
    UserPost.findAll({include: User})
      .then((posts) => {
        console.log(posts)
        res.status(200).json(posts);
      })
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
            msg: 'Not Found'
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static createPost(req, res, next) {
    const { title, thumbnail_url, caption } = req.body
    UserPost.create({
      title,
      thumbnail_url,
      caption,
      UserId: req.decodedUser.id
    })
      .then(data => {
        res.status(201).json({
          data: data,
          msg: 'create post succeed'
        })
      })
      .catch(err => {
        console.log(err.errors[0].message)
        next(err)
      })
  }

  static delPostById(req, res, next) {
    const { id } = req.params
    UserPost.destroy({
      where: {
        id: id
      }
    })
      .then(_ => {
        res.status(200).json({
          msg: 'Delete succeed'
        })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = Controller