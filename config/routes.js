var express = require('express')
var router = new express.Router()

var usersCtrl = require('../controllers/users')

router.route('/')
  .get(usersCtrl.index)


moduel.exports = router
