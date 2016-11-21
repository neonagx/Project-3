var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  provider: String,
  watched: Boolean,
  // users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})


var Movie = mongoose.model('Movie', MovieSchema)

//make available to our other files
module.exports = Movie
