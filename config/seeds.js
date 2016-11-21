require('dotenv').config()

var mongoose = require('./database')

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

Movie.remove({}, function(err){
  if(err) console.log(err)
  Movie.create(movies, function(err, createdMovies){
    if(err) {
      console.log(err)
    } else {
      console.log("Database seeded with " + createdMovies.length + " movies")
      mongoose.connection.close()
    }
    process.exit()
  })
})
