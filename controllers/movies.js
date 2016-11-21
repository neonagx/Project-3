var Movie = require('../models/movie')

function index(req, res, next){
  Movie.find({}, function(err, movies){
    if(err) next(err)
    res.json(movies)
  })
}
