var Movie = require('../models/movie')
var movies = [
  {
    title: "Star Wars",
    genre: "SciFi",
    provider: ["Amazon Prime", "Netflix", "Hulu Plus"],
    watched: true
  },
  {
    title: "The Hangover",
    genre: "Comedy",
    provider: ["Amazon Prime", "Netflix", "Hulu Plus"],
    watched: true
  },
  {
    title: "Close Encounters",
    genre: "Classic",
    provider: ["Amazon Prime", "Netflix", "Hulu Plus"],
    watched: false
  },
]

function index(req, res) {
  res.render('movies/index', {movies: movies})
}

function create(req, res) {
  movies.push(req.body)
  res.json(movies);
};

function show(req, res) {
  movie = movies.find(function(c) {
    return c["id"] == req.params.id;
  });
  res.json(movie);
}

function update(req, res) {
  movieIndex = movies.findIndex(function(c) {
    return c["id"] == req.params.id;
  });
  movies[movieIndex] = req.body;
  res.json(movies);
}

function destroy(req, res) {
  movieIndex = movies.findIndex(function(c) {
    return c["id"] == req.params.id;
  });
  movies.splice(movieIndex,1);
  res.json(movies);
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}

// module.exports = {
//   getAll: index,
//   getNew: newMovie,
//   create: createMovie
// }
// //index
// function index(req, res){
//   res.render('movies/index', {movies: movies})
// }
//
// function newMovie(req, res){
//   res.render('movies/new')
// }
//
// //create
// function createMovie(req, res){
//   var newMovie = new Movie(req.body){
//   Title: title,
//   Genre: genre
//   }
//   Movie.save(function(err){
//     if(err) throw err {
//       console.log(err)
//     } else {
//       console.log('Movie created!')
//     }
//   })
// }
//
// // show
// function getMovie(request, response) {
//   var id = request.params.id;
//
//   Movie.findById({_id: id}, function(error, movie) {
//     if(error) response.json({message: 'Could not find movie b/c:' + error});
//
//     response.json({movie: movie});
//   });
// }
//
// // update
// function updateMovie(request, response) {
//   var id = request.params.id;
//
//   Movie.findById({_id: id}, function(error, movie) {
//     if(error) response.json({message: 'Could not find movie b/c:' + error});
//
//     if(request.body.name) movie.name = request.body.name;
//     if(request.body.color) movie.color = request.body.color;
//
//     movie.save(function(error) {
//       if(error) response.json({messsage: 'Could not update movie b/c:' + error});
//
//       response.json({message: 'Movie successfully updated'});
//     });
//   });
// }
//
// // delete
// function removeMovie(request, response) {
//   var id = request.params.id;
//
//   Movie.remove({_id: id}, function(error) {
//     if(error) response.json({message: 'Could not delete movie b/c:' + error});
//
//     response.json({message: 'Movie successfully deleted'});
//   });
// }
//
//
// module.exports = {
//   getAll: getAll,
//   createMovie: createMovie,
//   getMovie: getMovie,
//   updateMovie: updateMovie,
//   removeMovie: removeMovie
// }
