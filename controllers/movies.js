var Movie = require('../models/movie')

//index
function getAll(req, res){
  Movie.find(function(err, movies){
    if(err)
    res.json({msg: 'Could not find a movie.'})

    res.json({movies: movies})
  })
}

//create
function createMovie(req, res){
  var newMovie = new Movie(req.body){
  Title: title,
  Genre: genre
  }
  Movie.save(function(err){
    if(err){
      console.log(err)
    } else {
      console.log('Movie created!')
    }
  })
}

// show
function getMovie(request, response) {
  var id = request.params.id;

  Movie.findById({_id: id}, function(error, movie) {
    if(error) response.json({message: 'Could not find movie b/c:' + error});

    response.json({movie: movie});
  });
}

// update
function updateMovie(request, response) {
  var id = request.params.id;

  Movie.findById({_id: id}, function(error, movie) {
    if(error) response.json({message: 'Could not find movie b/c:' + error});

    if(request.body.name) movie.name = request.body.name;
    if(request.body.color) movie.color = request.body.color;

    movie.save(function(error) {
      if(error) response.json({messsage: 'Could not update movie b/c:' + error});

      response.json({message: 'Movie successfully updated'});
    });
  });
}

// delete
function removeMovie(request, response) {
  var id = request.params.id;

  Movie.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete movie b/c:' + error});

    response.json({message: 'Movie successfully deleted'});
  });
}


module.exports = {
  getAll: getAll,
  createMovie: createMovie,
  getMovie: getMovie,
  updateMovie: updateMovie,
  removeMovie: removeMovie
}
