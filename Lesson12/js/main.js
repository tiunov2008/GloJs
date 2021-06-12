'use strict'

let elemId = 0;
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

var todoData = [
];

if(localStorage.todoValue !== undefined && localStorage.todoCompleted !== undefined){
    var todoComplete = localStorage.todoCompleted.split(', ');  
    var todoValue = localStorage.todoValue.split(', ');
    for (let i = 0; i < todoValue.length; i++) {
        let newTodo = {
            value: todoValue[i],
            completed: !todoComplete[i],
        };
        todoData.push(newTodo);
    }
}

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item){
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
            for (let i = 0; i < todoData.length; i++) {
                if(item.id !== todoData[i].id){
                    todoData.splice(todoData[i]);
                    localStorage.removeItem();
                    break;
                }
            }
            render();
        })
    });
};


todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false,
        id: elemId,
    };
    if(headerInput.value.trim() !== ''){
        todoData.push(newTodo);
        elemId++;
    }
    if(newTodo.value !== undefined && newTodo.completed !== undefined){
        localStorage.todoValue += newTodo.value + ', ';
        localStorage.todoCompleted += newTodo.completed + ', ';
    }
    headerInput.value = '';
    render();
})

render();