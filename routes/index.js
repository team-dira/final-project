const router = require('express').Router()
const Controller = require('../controllers/Controller')
const authentication = require('../middlewares/authentication')

router.post('/login', Controller.login)
router.get('/users', Controller.fetchUsers)
// router.use(authentication)
router.get('/posts', Controller.getPosts)
router.post('/posts', Controller.createPost)
// router.get('/posts/:id', Controller.getPostById)
// router.delete('/posts/:id', Controller.delPostById)




module.exports = router
