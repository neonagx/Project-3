var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

var http = require('http')
var dateTime = new Date,
    utcDate = dateTime.toUTCString(),
    port = process.env.PORT || 3000,
    routes = [
      {route: '/', content: '<h1 style="text-align: center">Welcome to MovieFindr!</h1>'},
      {route: '/movies', content: '<h1>My Movie List</h1>'},
      {route: '/users', content: '<h1>This is our User page</h1>'}
    ]
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/moviefindr')
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

server = http.createServer(function(req, res){
  for(var i = 0; i < routes.length; i++) {
    if(req.url === routes[i].route){
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(routes[i].content)
    } else if (i === routes.length -1){
      res.writeHead(404, {'Content-Type': 'text/html'})
      res.end('<h1>There is no ' + req.url + ' page!</h1><img src="https://http.cat/404" width= 100%>')
    }
  }

  console.log(req.method, 'A request has been made on', req.url, 'on', utcDate)
})

server.listen(port, function(){
  console.log('Our server is running on port', port)
})
module.exports = app
