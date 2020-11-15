const router = require('express').Router()
const Controller = require('../controllers/Controller')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.post('/login', Controller.login)
router.get('/users', Controller.fetchUsers)

router.get('/posts', Authentication, Controller.getPosts)
router.get('/posts/:id', Authentication, Controller.getPostById)
router.post('/posts', Authentication, Controller.createPost)
router.delete('/posts/:id', Authentication, Authorization, Controller.delPostById)




module.exports = router
