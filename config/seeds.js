require('dotenv').config();

var mongoose = require('./database')

var Movie = require('..models/movies')

var movies = [
  {
    title: "Star Wars",
    genre: "SciFi",
    watched: true
  },
  {
    title: "The Hangover",
    genre: "Comedy",
    watched: true
  },
  {
    title: "To Sir With Love",
    genre: "Classic",
    watched: false
  },
]

Movie.remove({}, function(err){
  of (err) console.log(err)
  Movie.create(movies, function(err, movies){
    if (err) {
      console.log(err)
    } else {
      console.log('Database seeded with ' + movies.length ' movies.')
      mongoose.connection.close()
    }
    process.exit()
  })
})
