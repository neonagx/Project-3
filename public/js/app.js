console.log('app.js loaded');

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "/movies/api/movies"
  }).done(function(jsonMovies){
    jsonMovies.forEach(function(jsonMovie){
      console.log(jsonMovie)
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
      $('#watched').append(movieHTML)
    })
  })

  function createMovieHTML(jsonMovie){
    console.log(jsonMovie)
    return $(`<li>${jsonMovie.title}</li><li>${jsonMovie.genre}<li>${jsonMovie.watched ? "checked" : ""}</li><li>${jsonMovie.provider}`)
  }

  function updateHandler(e){
    var html = $(this).parent()
    var id = html.attr('id').slice(5)

    $.ajax({
      type: "PATCH",
      url: "/api/movies/" + encodeURIComponent(id),
      data: {}
    }).done(function(jsonMovie){
      html.remove()
      var movieHTML = createMovieHTML(jsonMovie)
      if(jsonMovie.watched) {
        $('#watched').append(movieHTML)
      } else {
        $('#not-watched').append(movieHTML)
      }
    })
  }

  function deleteHandler(e){
    var html = $(this).parent()
    var id = html.attr('id').slice(5)

    $.ajax({
      type: "DELETE",
      url: "/api/movies/" + encodeURIComponent(id),
    }).done(function(data){
      html.remove()
      console.log(data.message)
    })
  }
  $('#personal-movie').on('click', ':checkbox', updateHandler)
  $('#bootsy-movie').on('click', ':checkbox', updateHandler)
  $('#personal-movie').on('click', '.remove-item', deleteHandler)
  $('#bootsy-movie').on('click', '.remove-item', deleteHandler)
})
