var allMovies;
var filteredMovies = [];
var searchName = '';
var template;

$(function() {
  // load all movies one time at load
  $.get('/api/movies', function(data) {
    allMovies = data;
    template = _.template($('#movieTemplate').html());
    render();
  });
});

function render() {
  applyFilterAndSort();
  $('#movies').html(template({movies: filteredMovies}));
}

function applyFilterAndSort() {
  if (searchName) {
    filteredMovies = allMovies.filter(function(movie) {
      return movie.name.toLowerCase().indexOf(searchName.toLowerCase()) >= 0;
    });
  } else {
    filteredMovies = allMovies;
  }
  var sortKey = $('#sortCohort').is(":checked") ? 'cohort' : 'name';
  filteredMovies = _.sortBy(filteredMovies, sortKey);
}

function doSearch() {
  var curSearch = $('#search').val();
  if (curSearch != searchName) searchName = curSearch;
  render();
}

function addFact() {
  $.post(
    '/api/facts',
    { fact: $('#fact').val() }).done(function(data) {
      $('#fact').val('');
      var updated = allMovies.find(function(movie) {
        return movie._id === data._id;
      });
      updated.facts.push(data.facts.pop());
      render();
    }
  );
}

/* ----- event handlers ----- */

$('#search').on('keypress blur', function(evt) {
  if (evt.keyCode === 13 || evt.type === 'blur') doSearch();
});

$('[type="radio"]').on('change', function() { render(); });
