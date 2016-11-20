var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

// Require controllers.
var usersController = require('../controllers/users');
var moviesController = require('../controllers/movies');

// root path:
router.get('/', function(req, res) {
  res.send('<h1>This works</h1>')
});

router.get('/movies', moviesController.index);
router.post('/movies', moviesController.create);
router.get('/movies/:id', moviesController.show);
router.put('/movies/:id', moviesController.update);
router.delete('/movies/:id', moviesController.destroy);

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);

module.exports = router
