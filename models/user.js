var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  googleId: String
})

UserSchema.methods.sayHello = function(){
  console.log("Hi " + userName + ", is this working?")
}

var User = mongoose.model('User', UserSchema)

//make available to our other files
module.exports = User
