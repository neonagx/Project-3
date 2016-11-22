var Movie = require('../models/movie')

function index(req, res, next) {
	Movie.find({}, function(err, movies){
		if (err) next(err)
		res.render('movies/index', {movies: movies})
	})
}

function movieApi(req, res, next) {
	Movie.find({}, function(err, movies) {
		res.json(movies)
	})
}

// function newMovie(req, res, next) {
// 	console.log('inside new movie')
//   res.render('movies/new')
// }

function create(req, res, next) {
  var movie = new Movie(req.body)

  movie.save(function(err, savedMovie){
    if(err) {
      res.send(err)
    }
		res.json(savedMovie)
  })
};

function show(req, res) {
  var id = req.params.id

  Movie.findById(id, function(err, movie){
    if (err) {
      res.send(err)
    }
    res.json(movie)
  })
}

function update(req, res) {
  var id = req.params.id

  Movie.findById(id, function(err, movie){
    if (err) {
      res.send(err)
    }
    if(req.body.title) movie.title = req.body.title
    if(req.body.genre) movie.genre = req.body.genre
		if(req.body.provider) movie.provider = req.body.provider
		if(req.body.watched) movie.watched = req.body.watched

    movie.save(function(err, updatedMovie){
      if(err) {
        res.send(err)
      }
      console.log("updated movie")
      res.redirect('/movies')
    })
  })
}

function destroy(req, res) {
  var id = req.params.id

  Movie.remove({"_id" : id}, function(err){
    if(err) {
      res.send(err)
    }
    console.log("Movie deleted")
    res.json({message: 'Movie is deleted'})
  })
}

module.exports = {
	movieApi: movieApi,
  index: index,
  // newMovie: newMovie,
  create: create,
  showMovie: show,
  updateMovie: update,
  destroyMovie: destroy
}
