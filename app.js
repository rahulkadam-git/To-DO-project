const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-List");
const filtertodo= document.querySelector(".filters-todo")

//event
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filtertodo.addEventListener("click", filterTodos);

//functions
function addTodo(event) {
   //to prevent default 
    event.preventDefault();


    const todoDiv =document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo =document.createElement('li');
    newTodo.innerText=todoInput.value ;
    newTodo.classList.add('todo-Item');
    todoDiv.appendChild(newTodo);

saveLocalTodos(todoInput.value);

//complete button
    const completedButton =document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton =document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value="";
}

function deleteCheck(e){
    const item =e.target;

    if(item.classList[0]==='trash-button')
    {
        const todo =item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    if(item.classList[0]==='completed-button')
    {
        const todo =item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodos(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
        case "all":
            todo.style.display="flex";
            break;
            case "completed":
            
                if(todo.classList.contains("completed"))
                       {
                           todo.style.display="flex";
               }else{
                   todo.style.display="none";
                    }break;
        case "uncompleted":
            
         if(!todo.classList.contains("completed"))
                {
                    todo.style.display="flex";
        }else{
            todo.style.display="none";
             }break;
    }

});
}

function saveLocalTodos(todo) {

    let todos;
    if(localStorage.getItem("todos") === null)
        {
            todos = [];
        }else
{
    todos = JSON.parse(localStorage.getItem('todos'));
}
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null)
        {
            todos = [];
        }else
{
    todos = JSON.parse(localStorage.getItem('todos'));
}
todos.forEach(function(todo){
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo =document.createElement('li');
    newTodo.innerText=todo ;
    newTodo.classList.add('todo-Item');
    todoDiv.appendChild(newTodo);
//complete button
    const completedButton =document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);
//trash button
    const trashButton =document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
});
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null)
        {
            todos = [];
        }else
{
    todos = JSON.parse(localStorage.getItem('todos'));
}
const todoIndex= todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex),1);
localStorage.setItem('todos',JSON.stringify(todos));
}