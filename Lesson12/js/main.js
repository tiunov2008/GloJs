'use strict'

let elemId = 0;
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

var todoData = [
];

let addLocalStorage = function(){
    var todoComplete = localStorage.todoCompleted.split(' ');  
    var todoValue = localStorage.todoValue.split(' ');
    for (let i = 0; i < todoValue.length; i++) {
        let newTodo = {
            value: todoValue[i],
            completed: todoComplete[i],
        };
        console.log(13);
        todoData.push(newTodo);
    }
}

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    localStorage.todoValue = '';
    localStorage.todoCompleted = '';
    todoData.forEach(function(item){
        localStorage.todoValue += item.value + ' ';
        localStorage.todoCompleted += item.completed + ' ';
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = 	'<span class="text-todo">' + item.value + '</span>' + 
                        '<div class="todo-buttons">'+
                            '<button class="todo-remove"></button>'+
                            '<button class="todo-complete"></button>'+
                        '</div>';
                        
        if(item.completed){
            todoCompleted.append(li);
        }else{
            todoList.append(li);
        }

        const btnTodoCompleted = li.querySelector('.todo-complete');

        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        })

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', function(){
            render();   
        })
    });
};

let id = 0;
todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false,
        id: id,
    };
    if(headerInput.value.trim() !== ''){
        todoData.push(newTodo);
    }
    headerInput.value = '';
    id++;
    render();
})

render();