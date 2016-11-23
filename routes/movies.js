var router = require('express').Router()
var moviesCtrl = require('../controllers/movies')

router.route('/')
  .get(moviesCtrl.index)
router.route('/api/movies')
  .get(moviesCtrl.movieApi)
  .post(moviesCtrl.create)
router.route('/api/movies/:id')
  .get(moviesCtrl.showMovie)
  .patch(moviesCtrl.updateMovie)
  .delete(moviesCtrl.destroyMovie)

module.exports = router
