var router = require('express').Router()
var bodyParser = require('body-parser')

var moviesCtrl = require('../controllers/movies')

router.route('/movies')
  .get(moviesCtrl.index)
//   .post(moviesCtrl.create)
// router.route('/movies/:id')
//   .get(moviesCtrl.show)
//   .patch(moviesCtrl.update)
//   .delete(moviesCtrl.destroy)

module.exports = router
