


class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend',
            `<span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>`
        );

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
        this.handler(li, todo, this);
    }


    addTodo(e) {
        e.preventDefault();

        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        }



    }


    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(30).substring(2, 15);
    }

    deleteItem(todo, _this) {
        _this.todoData.delete(todo.key);
        localStorage.removeItem(todo);
    }


    completedItem(todo) {
        todo.completed = !todo.completed;
    }

    handler(li, todo, _this) {
        const btnTodoCompleted = li.querySelector('.todo-complete');
        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoCompleted.addEventListener('click', () => {
            _this.completedItem(todo);
            _this.render();
        });
        btnTodoRemove.addEventListener('click', () => {
            _this.deleteItem(todo, _this);
            _this.render();
        });
    }


    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }

}



const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
