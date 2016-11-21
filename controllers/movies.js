var Movie = require('../models/movie')


var movies = [
  {
    title: 'Interstellar',
    genre: 'Science Fiction',
    provider: ['Amazon Prime', 'Netflix', 'Hulu Plus'],
    watched: true
  },
  {
    title: 'Saving Private Ryan',
    genre: 'War',
    provider: ['Amazon Prime', 'Netflix'],
    watched: false
  }
]

function indexMovie(req, res, next){
  Movie.find({}, function(err, movies){
    if(err) next(err)
    res.render('./movie', {movies:movies})
  })
}

// function newMovie(req, res){
//   response.render('./new')
// }
//
// function createMovie(req, res){
//   var movie = new Movie(req.body.movie)
//
//   movie.save(function(err){
//     if(err) next(err)
//     res.redirect('/movie')
//   })
// }
//
// function showMovie(req, res){
//   var id = req.params.id
//
//   Movie.findById({_id: id}, function(err, movie){
//     if(err) next(err)
//     res.json({movie: movie})
//   })
// }
//
// function updateMovie(req, res){
//   var id = req.params.id
//
//   Movie.findById({_id: id}, function(err, movie){
//     if(err) next(err)
//     if(req.body.title) movie.title = req.body.title
//     if(req.body.genre) movie.genre = req.body.genre
//     if(req.body.provider) movie.provider = req.body.provider
//     if(req.body.watched) movie.watched = req.body.watched
//
//     movie.save(function(err){
//       if(err) res.json({message: 'Cannot update'})
//       res.json({message: 'success'})
//     })
//   })
// }
//
// function deleteMovie(req, res){
//   var id = req.params.id
//
//   Movie.remove({_id: id}, function(err){
//     if(err) res.json({message: 'Cannot delete'})
//     res.json({message: 'Movie deleted'})
//   })
// }

module.exports = {
  index: indexMovie,
  // new: newMovie,
  // create: createMovie,
  // show:  showMovie,
  // update: updateMovie,
  // delete: deleteMovie
}
