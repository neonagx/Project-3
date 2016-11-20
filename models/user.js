var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  userName: String,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
})

UserSchema.methods.sayHello = function(){
  console.log("Hi " + userName + ", is this working?")
}

var User = mongoose.model('User', UserSchema)

//make available to our other files
module.exports = User
