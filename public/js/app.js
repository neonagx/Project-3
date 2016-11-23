console.log('app.js loaded');

var searchResults = false;
console.log(searchResults)

var title
var image
var genre
var freeSources
var subSources
var purchaseSources

$(document).ready(function(){

  function createMovieHTML(jsonMovie){
    return $(`<a class='carousel-item' id="movie-${jsonMovie._id}">Title:${jsonMovie.title}<br>Genre: ${jsonMovie.genre}<br>Provider: ${jsonMovie.provider}<br><input type="checkbox" id=${jsonMovie._id} ${jsonMovie.watched ? "checked" : ""}/><label for=${jsonMovie._id}>Watched</label><br><button class="remove-item">X</span></button></a>`)
  }

  $.ajax({
    type: "GET",
    url: "/movies/api/movies"
  }).done(function(jsonMovies){
    jsonMovies.forEach(function(jsonMovie){
      var movieHTML = createMovieHTML(jsonMovie)

      if(jsonMovie.watched) {
        $('#watched').append(movieHTML)
      } else {
        $('#not-watched').append(movieHTML)
      }
    })
  })
  // Attach Listener on form button to perform AJAX post of new movie
  $('#new-movie').on('submit', function(e){
    //stop the default behavior from clicking on the submit button
    e.preventDefault()

    //Create object representing new movie to be added
    var newMovie = {
      title: $('#movie-title').val(),
      genre: $('#movie-genre').val(),
      provider: $('#movie-provider').val(),
      watched: $('#movie-watched').val()
    }
    $.post('/movies/api/movies', newMovie).done(function(jsonMovie){
      //Clear the form
      $('#movie-title').val('')
      $('#movie-genre').val('')
      $('#movie-provider').val('')
      $('#movie-watched').val('')

      var movieHTML = createMovieHTML(jsonMovie)
      $('#not-watched').append(movieHTML)
    })
  })

  function updateHandler(e){
    var html = $(this).parent()
    var id = html.attr('id').slice(6)
    console.log(id)
    $.ajax({
      type: "PATCH",
      url: "movies/api/movies/" + encodeURIComponent(id),
      data: {}
    }).done(function(jsonMovie){
      html.remove()
      var movieHTML = createMovieHTML(jsonMovie)
      console.log(jsonMovie)
      if(jsonMovie.watched) {
        $('#watched').append(movieHTML)
      } else {
        $('#not-watched').append(movieHTML)
      }
    })
  }

  function deleteHandler(e){
    var html = $(this).parent()
    var id = html.attr('id').slice(6)

    $.ajax({
      type: "DELETE",
      url: "movies/api/movies/" + encodeURIComponent(id),
    }).done(function(data){
      html.remove()
      console.log(data.message)
    })
  }
  $('#watched').on('click', ':checkbox', updateHandler)
  $('#not-watched').on('click', ':checkbox', updateHandler)
  $('#watched').on('click', '.remove-item', deleteHandler)
  $('#not-watched').on('click', '.remove-item', deleteHandler)

  // $('#submitSearch').click(function(){
  //   var searchInput = $('#search').val()
  //   window.location.replace(self.location.href.slice(0,-1) +"/" + searchInput)
  // })

  $('#submitSearch').click(function(){
    $('#searchResults').empty()
    var searchString = $('#search').val()
    $.ajax({
      type: 'GET',
      url: 'https://api-public.guidebox.com/v1.43/US/T1srQMKdGpmfuqtp0ciZ7Wfqb82FXc/search/movie/title/' + searchString
    }).done(function(data){
      console.log(data)
      var results = data.results
      if(results.length >= 5) {
        shortArr = []
        for(var i = 0; i < 5; i++) {
          shortArr.push(results[i])
        }
        shortArr.forEach(function(movie){
          console.log(movie)
          $('#searchResults').append(`<li id='${movie.id}'>${movie.title}</li> <img class='clickPic' src="${movie.poster_240x342}">
          <p> ${movie.rating} | ${ movie.release_date} </p>`)
        })
      } else {
        results.forEach(function(movie){
          console.log(movie)
          $('#searchResults').append(`<li id='${movie.id}'><a>${movie.title}</a></li><img class='clickPic' src="${movie.poster_240x342}">
          <p> ${movie.rating} | ${ movie.release_date} </p>`)
        })
      }
    })
  })

  $('#searchResults').on('click', '.clickPic', function(){
    var id = $(this).prev().attr('id')
    console.log(id)
    $.ajax({
    type: 'GET',
    url: 'https://api-public.guidebox.com/v1.43/US/T1srQMKdGpmfuqtp0ciZ7Wfqb82FXc/movies/' + id
    }).done(function(data){
      var title = data.title
      var image = data.poster_240x342
      var genre = data.genres[0].title
      var freeSources = data.free_web_sources
      var subSources =
      data.subscription_web_sources
      var purchaseSources =
      data.purchase_web_sources
      var newMovie = {
        title: data.title,
        genre: data.genres[0].title
      }
      $.post('/movies/api/movies', newMovie).done(function(jsonMovie){
        var movieHTML = createMovieHTML(jsonMovie)
        $('#not-watched').append(movieHTML)
      })
    })
  })



//end document ready
})
