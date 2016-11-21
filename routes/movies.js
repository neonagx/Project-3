var express = require('express')
var router = express.Router()
var moviesCtrl = require('../controllers/movies')

router.route('/')
  .get(moviesCtrl.index)
  .post(moviesCtrl.create)

router.route('/new')
  .get(moviesCtrl.newMovie)

router.route('/:id') 
  .get(moviesCtrl.showMovie)
  .patch(moviesCtrl.updateMovie)
  .delete(moviesCtrl.destroyMovie)


module.exports = router
