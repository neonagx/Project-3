var express = require('express')
var router = express.Router()
var moviesController = require('../controllers/movies')

router.get('/', moviesController.index)

router.route('/new')
  .get(moviesController.newMovie)


module.exports = router
