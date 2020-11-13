const router = require('express').Router()
const UserController = require('../controllers/userController')

router.get('/users', UserController.register)

module.exports = router
