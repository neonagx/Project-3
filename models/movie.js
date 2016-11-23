var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  providers: Array,
  imageSrc: String,
  watched: Boolean
})

var Movie = mongoose.model('Movie', MovieSchema)

//make available to our other files
module.exports = Movie
