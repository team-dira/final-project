const router = require('express').Router();
const { UserPost } = require('../models');

router.get('/posts', (req, res, next) => {
  UserPost.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
