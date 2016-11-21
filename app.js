var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var routes = require('./config/routes')
var app = express()

var http = require('request')
var port = process.env.PORT || 3000

// app.get('/', function(req, res){
//   res.send('Welcome to Your MovieFindr')
// })
app.post('/movies', function(req, res){
  console.log(req.body)
  res.status(200)
})

var server = app.listen(port, function(){
  console.log('Server listening on port', port)
})

// var http = require('http'),
//     dateTime = new Date,
//     utcDate = dateTime.toUTCString(),
//     port = process.env.PORT || 3000,
//     server = http.createServer(function(req, res){
//         if(req.url === '/'){
//           res.writeHead(200, {'Content-Type': 'text/html'})
//           res.end('<h1>Welcome to MovieFindr</h1>')
//         } else if (req.url === '/movies'){
//           res.writeHead(200, {'Content-Type': 'text/html'})
//           res.end('<h1>This is our Movies Page</h1>')
//         } else if (req.url === '/users'){
//           res.writeHead(200, {'Content-Type': 'text/html'})
//           res.end('<h1>This is our Users Page</h1>')
//         } else {
//           res.writeHead(404, {'Content-Type': 'text/html'})
//           res.end('<h1>There is no ' + req.url + ' page</h1><img src="https://http.cat/404" width= 100%>')
//       }

    // routes = [
    //   {route: '/', content: '<h1 style="text-align: center">Welcome to MovieFindr!</h1>'},
    //   {route: '/movies', content: '<h1>My Movie List</h1>'},
    //   {route: '/users', content: '<h1>This is our User page</h1>'}

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/moviefindr')
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use('/', routes)
app.locals.title = "MovieFindr App"


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

//   console.log(req.method, 'A request has been made on', req.url, 'on', utcDate)
// })

// server.listen(port, function(){
//   console.log('Our server is running on port', port)
// })
module.exports = app
