var mongoose = require('mongoose');

var dbUri = process.env.MONGODB_URI ||
            'mongodb://localhost/' + process.env.LOCAL_DB;

if (!process.env.MONGODB_URI) {

  require('net').connect(27017, 'localhost').on('error', function() {
    console.log("YOU MUST START MONGOD");
    process.exit(0);
  });
}

mongoose.connect(dbUri);

module.exports = mongoose;
