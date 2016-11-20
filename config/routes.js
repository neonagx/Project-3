var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

// Require controllers.
var usersController = require('../controllers/users');
var moviesController = require('../controllers/movies');

// root path:

router.get('/', function(req, res){
  res.send('<h1>This works</h1>')
})

router.route('/movies')
  .get(moviesController.getAll)
  .post(moviesController.createMovie)

router.route('movies/:id')
  .get(moviesController.getMovie)
  .put(moviesController.updateMovie)
  .delete(moviesController.removeMovie)

module.exports = router
