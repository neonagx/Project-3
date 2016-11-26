var router = require('express').Router()
var listsCtrl = require('../controllers/lists')
var moviesCtrl = require('../controllers/movies')

router.route('/')
  .get(listsCtrl.index)
router.route('/lists')
  .get(listsCtrl.listApi)
  .post(listsCtrl.create)
router.route('/lists/:id')
  .get(listsCtrl.showList)
  .patch(listsCtrl.updateList)
  .delete(listsCtrl.destroyList)

module.exports = router
