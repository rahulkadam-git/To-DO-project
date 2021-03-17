"use strict";

var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-List");
var filtertodo = document.querySelector(".filters-todo"); //event

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filtertodo.addEventListener("click", filterTodos); //functions

function addTodo(event) {
  //to prevent default 
  event.preventDefault();
  var todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  var newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-Item');
  todoDiv.appendChild(newTodo);
  saveLocalTodos(todoInput.value); //complete button

  var completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-button");
  todoDiv.appendChild(completedButton); //trash button

  var trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  var item = e.target;

  if (item.classList[0] === 'trash-button') {
    var todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }

  if (item.classList[0] === 'completed-button') {
    var _todo = item.parentElement;

    _todo.classList.toggle("completed");
  }
}

function filterTodos(e) {
  var todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
    }
  });
}

function saveLocalTodos(todo) {
  var todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  var todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    var newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-Item');
    todoDiv.appendChild(newTodo); //complete button

    var completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton); //trash button

    var trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  var todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  var todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}