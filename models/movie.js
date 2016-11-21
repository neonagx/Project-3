var mongoose = require('mongoose')

var movieSchema = new mongoose.Schema({
  title: {type: String, required: true},
  genre: {type: String, required: true},
  provider: String,
  watched: Boolean
})

var Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
