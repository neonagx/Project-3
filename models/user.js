var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  googleId: String
})

module.exports = mongoose.model('User', userSchema)
