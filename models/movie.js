var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
})

var Movie = mongoose.model('Movie', MovieSchema)

//make available to our other files
module.exports = Movie
