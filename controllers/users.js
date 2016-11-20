var User = require('../models/user')

var newUser = new User(){
  userName: 'Gaye',
  email: 'glowen@gamil.com',
  googleId: 'password'
}

newUser.save(function(err){
  if(err){
    console.log(err)
  } else {
    console.log('User created!')
  }
})
