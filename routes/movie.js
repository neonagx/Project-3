var router = require('express').Router()

var moviesCtrl = require('../controllers/movies')

router.route('/api/movies')
  .get(moviesCtrl.index)

module.exports = router
