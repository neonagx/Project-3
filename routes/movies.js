var express = require('express')
var router = express.Router()
var moviesCtrl = require('../controllers/movies')

router.route('/')
  .get(moviesCtrl.index)
router.route('/new')
  .get(moviesCtrl.newMovie)
router.route('/api/movies')
  .get(moviesCtrl.index)
  .post(moviesCtrl.create)
router.route('/api/movies/:id')
  .get(moviesCtrl.showMovie)
  .patch(moviesCtrl.updateMovie)
  .delete(moviesCtrl.destroyMovie)

module.exports = router
