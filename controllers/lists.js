var List = require('../models/list')
var authenticate = require('./authenticate')
var request = require('request')

function index(req, res, next) {
	List.find({}, function(err, lists){
		if (err) next(err)
		res.render('lists/index', {lists: lists, user: req.user})
	})
}

function listApi(req, res, next) {
	List.find({}, function(err, lists) {
		res.json(lists)
	})
}

function create(req, res, next) {
  var list = new List(req.body)

  list.save(function(err, savedList){
    if(err) next(err)
		res.json(savedList)
  })
}

function show(req, res, next) {
  var id = req.params.id

  List.findById(id, function(err, list){
    if (err) next(err)
    res.json(list)
  })
}

function update(req, res, next) {
  var id = req.params.id

  List.findById(id, function(err, list){
    if (err) next(err)

		list.watched = !list.watched
    list.save(function(err, updatedList){
      if(err) next(err)
      console.log("updated list")
			res.json(updatedList)
    })
  })
}

function destroy(req, res, next) {
  var id = req.params.id

  List.remove({_id : id}, function(err){
    if(err) next(err)
    console.log("List deleted")
    res.json({message: 'List is deleted'})
  })
}


module.exports = {
	listApi: listApi,
  index: index,
  create: create,
  showList: show,
  updateList: update,
  destroyList: destroy
}
