console.log('app.js loaded');

var searchResults = false
var title
var image
var genre
var freeSources
var subSources
var purchaseSources
var overview
var MovieId
var newMovie

$(document).ready(function(){

  function createMovieHTML(jsonMovie){
    console.log(jsonMovie)
    return $(`<li id="movie-${jsonMovie._id}">Title: ${jsonMovie.title}<br>Genre: ${jsonMovie.genre}<br><img src=${jsonMovie.imageSrc}><br><input style="color:red" type="checkbox" id=${jsonMovie._id} ${jsonMovie.watched ? "checked" : ""}/><label for=${jsonMovie._id}>Watched</label><br><button class="remove-item btn btn-default">Delete Movie from list</span></button></li><br>`)
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

  $('#submitSearch').click(function(){
    $('#searchResults').empty()
    var searchString = $('#search').val()
    $.ajax({
      type: 'GET',
      url: 'https://api-public.guidebox.com/v1.43/US/rKwGrhy6qjpZS1rJFNnX0vpdWMRHMJCo/search/movie/title/' + searchString
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
          $('#searchResults').append(`<div class='searchResponses' id='${movie.id}div'><li id='${movie.id}'><h6>${movie.title}</h6></li><img class='clickPic' src="${movie.poster_240x342}">`)
        })
      } else {
        results.forEach(function(movie){
          console.log(movie)
          $('#searchResults').append(`<div class='searchResponses' id='${movie.id}div'><li id='${movie.id}'><h3>${movie.title}</h6></li><img class='clickPic' src="${movie.poster_240x342}">`)
        })
      }
    })
  })

  $('#searchResults').on('click', '.clickPic', function(){
    var id = $(this).prev().attr('id')
    console.log(id)
    $.ajax({
    type: 'GET',
    url: 'https://api-public.guidebox.com/v1.43/US/rKwGrhy6qjpZS1rJFNnX0vpdWMRHMJCo/movies/' + id
    }).done(function(data){

      overview = data.overview
      movieId = data.id
      newMovie = {
        title: data.title,
        genre: data.genres[0].title,
        imageSrc: data.poster_240x342
        }

      var title = data.title
      var image = data.poster_240x342
      var genre = data.genres[0].title
      $('.overview').remove()
      $('.addMovie').remove()
      $('.sources').remove()
      $(`#${data.id}div`).append(`<p class='overview'>${data.overview}</p><p class='overview'>Rated: ${data.rating} | Released Date: ${data.release_date}</p><button class='addMovie' onclick="Materialize.toast('Added Movie to Not Watched List', 4000)">Add Movie</button>`)
      var subSources = data.subscription_web_sources
      subSources.forEach(function(source){
        $(`#${data.id}div`).append(`<br class='sources'><a class='sources' href='${source.link}' target='_blank'>${source.display_name}</a>`)
      })
      var purchaseSources = data.purchase_web_sources
      purchaseSources.forEach(function(source){
          $(`#${data.id}div`).append(`<br class='sources'><a class='sources' href='${source.link}' target='_blank'>${source.display_name}</a>`)
      })
      console.log(purchaseSources)
    })
  })

  //adds movie to api/movies
  $('#searchResults').on('click', '.addMovie', function(){
    console.log(overview)
    console.log(movieId)
    console.log("You clicked on add movie!!!!")
    $.post('/movies/api/movies', newMovie).done(function(jsonMovie){
      var movieHTML = createMovieHTML(jsonMovie)
      $('#not-watched').append(movieHTML)
      })
  })

//end document ready
})
