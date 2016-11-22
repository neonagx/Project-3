var Movie = require('../models/movie')
var authenticate = require('./authenticate')

function index(req, res, next) {
	Movie.find({}, function(err, movies){
		if (err) next(err)
		res.render('movies/index', {movies: movies, user: req.user})
	})
}

function movieApi(req, res, next) {
	Movie.find({}, function(err, movies) {
		res.json(movies)
	})
}

function create(req, res, next) {
  var movie = new Movie(req.body)

  movie.save(function(err, savedMovie){
    if(err) {
    res.send(err)
    }
		res.json(savedMovie)
  })
}

function show(req, res, next) {
  var id = req.params.id

  Movie.findById(id, function(err, movie){
    if (err) next(err)
    res.json(movie)
  })
}

function update(req, res, next) {
  var id = req.params.id

  Movie.findById(id, function(err, movie){
    if (err) next(err)
    // if(req.body.title) movie.title = req.body.title
    // if(req.body.genre) movie.genre = req.body.genre
		// if(req.body.provider) movie.provider = req.body.provider
		// if(req.body.watched) movie.watched = req.body.watched
		movie.watched = !movie.watched
    movie.save(function(err, updatedMovie){
      if(err) next(err)
      console.log("updated movie")
			res.json(updatedMovie)
    })
  })
}

function destroy(req, res, next) {
  var id = req.params.id

  Movie.remove({_id : id}, function(err){
    if(err) next(err)
    console.log("Movie deleted")
    res.json({message: 'Movie is deleted'})
  })
}

module.exports = {
	movieApi: movieApi,
  index: index,
  create: create,
  showMovie: show,
  updateMovie: update,
  destroyMovie: destroy
}
