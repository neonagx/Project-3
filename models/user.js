var mongoose = require('mongoose')

<<<<<<< HEAD
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
=======
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String
})

module.exports = mongoose.model('User', userSchema)
>>>>>>> a98edb413a42529b5257041e5e646b7dca9e2591
