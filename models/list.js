var mongoose = require('mongoose')

var ListSchema = new mongoose.Schema({
  title: String,
  genre: String,
  providers: Array,
  imageSrc: String,
  watched: Boolean
})

var List = mongoose.model('List', ListSchema)

//make available to our other files
module.exports = List
