'use strict'

let elemId = 0;
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

var todoData = [
];

let addLocalStorage = function(){
    var todoComplete = localStorage.todoCompleted.split('_');  
    var todoValue = localStorage.todoValue.split('_');
    for (let i = 0; i < todoValue.length-1; i++) {
        let newTodo = {
            value: todoValue[i],
            completed: todoComplete[i],
        };
        todoData.push(newTodo);
    }
}
if(localStorage.todoCompleted !== undefined && localStorage.todoValue !== undefined)
addLocalStorage();
const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    localStorage.todoValue = '';
    localStorage.todoCompleted = '';
    let i = 0;
    todoData.forEach(function(item){
        localStorage.todoValue += item.value + '_';
        localStorage.todoCompleted += item.completed + '_';
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = 	'<span class="text-todo">' + item.value + '</span>' + 
                        '<div class="todo-buttons">'+
                            '<button class="todo-remove"></button>'+
                            '<button class="todo-complete"></button>'+
                        '</div>';
                        
        if(item.completed === 'true'){
            todoCompleted.append(li);
        }else if(item.completed === 'false'){
            todoList.append(li);
        }

        const btnTodoCompleted = li.querySelector('.todo-complete');

        btnTodoCompleted.addEventListener('click', function(){
            if(item.completed === 'true'){
                item.completed = 'false';
            }else{
                item.completed = 'true';
            }   
            
            render();
        })

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', function(){
            li.remove();
            todoData.splice(i-1, 1)
            render();
        })
        i++;
    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: 'false',
    };
    if(headerInput.value.trim() !== ''){
        todoData.push(newTodo);
    }
    headerInput.value = '';
    render();
})

render();