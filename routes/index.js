var router = require('express').Router();
var usersCtrl = require('../controllers/users')
/* GET home page. */
// 
// router.get('/users', usersCtrl.index)
//
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Movie Findr' });
// });

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
