console.log('app.js loaded');

$(document).ready(function(){

  function createMovieHTML(jsonMovie){
    console.log(jsonMovie._id)
    return $(`<li id="movie-${jsonMovie._id}">Title:${jsonMovie.title}<br>Genre: ${jsonMovie.genre}<br>Provider: ${jsonMovie.provider}<br><input type="checkbox" id=${jsonMovie._id} ${jsonMovie.watched ? "checked" : ""}/><label for=${jsonMovie._id}>Watched</label><br><button class="remove-item">X</span></button></li>`)
  }

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
    var searchInput = $('#search').val()
    window.location.replace(self.location.href.slice(0,-1) +"/" + searchInput)
  })

  function searchApi(req, res, next) {
  	var searchString = `https://api-public.guidebox.com/v1.43/US/T1srQMKdGpmfuqtp0ciZ7Wfqb82FXc/search/movie/title/${req.params.query}`
  	  request(searchString, function(err, response, body) {
  			var results = JSON.parse(body).results
  			if(results.length >= 5) {
  				shortArr = []
  				for(var i = 0; i < 5; i++) {
  					shortArr.push(results[i])
  				}
  				res.render("movies/search", {results: shortArr})
  			} else {
  				res.render("movies/search", {results: results})
  			}
  			// res.json(JSON.parse(body).results)
  	  })
  }

  $('.movieList').click(function(){
    console.log('clicked')
    var id = $(this).attr('id')
    $.ajax({
    type: 'GET',
    url: 'https://api-public.guidebox.com/v1.43/US/T1srQMKdGpmfuqtp0ciZ7Wfqb82FXc/movies/' + id
    }).done(function(data){
      var title = data.title
      var image = data.poster_240x342
      var genre = data.genres[0]
      var freeSources = data.free_web_sources
      var subSources =
      data.subscription_web_sources
      var purchaseSources =
      data.purchase_web_sources
      console.log(data.title)
      console.log(data.genres[0])
      console.log(data.poster_240x342)
    })
  })



//end document ready
})
