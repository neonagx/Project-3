console.log('app.js loaded');

$(document).ready(function(){
  // $.ajax({
  //   type: "GET",
  //   url: "/api/todos"
  // }).done(function(data){
    //Iterate through our array of json todos
    $.get('/api/todos').done(function(data){
    data.forEach(function(jsonTodo){
      var todoHTML = createTodoHTML(jsonTodo)

      if(jsonTodo.completed) {
        $('#personal-todo').append(todoHTML)
      } else {
        $('#bootsy-todo').append(todoHTML)
      }
    })
  })
  // Attach Listener on form button to perform AJAX post of new todo
  $('#new-todo').on('submit', function(e){
    //stop the default behavior from clicking on the submit button
    e.preventDefault()

    //Create object representing new todo to be added
    var newTodo = {
      task: $('#todo-task').val(),
      bootsyLevel: $('#todo-bootsy-level').val()
    }

    $.post('/api/todos', newTodo).done(function(jsonTodo){
      //Clear the form
      $('#todo-task').val('')
      $('#todo-bootsy-level').val('')

      var todoHTML = createTodoHTML(jsonTodo)
      $('#bootsy-todo').append(todoHTML)
    })
  })

  function createTodoHTML(jsonTodo){
    return $(`<li id="todo-${jsonTodo._id}"class="todo-item bootsy${jsonTodo.bootsyLevel}">${jsonTodo.task}
    <input type="checkbox" name="todo[completed]" ${jsonTodo.completed ? "checked" : ""}/><span class="remove-item">X</span></li>"`)
  }

  function updateHandler(e){
    var html = $(this).parent()
    var id = html.attr('id').slice(5)

    $.ajax({
      type: "PATCH",
      url: "/api/todos/" + encodeURIComponent(id),
      data: {}
    }).done(function(jsonTodo){
      html.remove()
      var todoHTML = createTodoHTML(jsonTodo)
      if(jsonTodo.completed) {
        $('#personal-todo').append(todoHTML)
      } else {
        $('#bootsy-todo').append(todoHTML)
      }
    })
  }

  function deleteHandler(e){
    var html = $(this).parent()
    var id = html.attr('id').slice(5)

    $.ajax({
      type: "DELETE",
      url: "/api/todos/" + encodeURIComponent(id),
    }).done(function(data){
      html.remove()
      console.log(data.message)
    })
  }
  $('#personal-todo').on('click', ':checkbox', updateHandler)
  $('#bootsy-todo').on('click', ':checkbox', updateHandler)
  $('#personal-todo').on('click', '.remove-item', deleteHandler)
  $('#bootsy-todo').on('click', '.remove-item', deleteHandler)
})
