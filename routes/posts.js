const router = require('express').Router()

router.get('/posts', authentication)
router.post('/posts', authentication, advisorAuthorization)


module.exports = router