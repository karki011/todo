var todoList = {
    todos: [],
    addToList: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodos: function (position) {
        this.todos.splice(position, 1); //what index and how many item to delete
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        // ****** First way to do

        //     if (completedTodos === totalTodos) {
        //         this.todos.forEach(function(todo) {
        //             todo.completed = false;
        //         });
        //         //case 2 : make everything true
        //     } else {
        //         this.todos.forEach(function(todo) {
        //             todo.completed = true;
        //         });
        //     }

        // *************second way

        this.todos.forEach(function (todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
};
var handlers = {
    addToList: function () {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addToList(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();
    },
    changeTodo: function () {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        view.displayTodos();
    },
    deleteTodos: function (position) {

        todoList.deleteTodos(position);
        view.displayTodos();
    },
    toggleCompleted: function () {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
        view.displayTodos();
    },
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    }
};
var view = {
    displayTodos: function () {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = ""; //clears out <ul> before adding <li>

        todoList.todos.forEach(function (todo, position) {
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = "";

            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText
            } else {
                todoTextWithCompletion = "( ) " + todo.todoText
            }
            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'deleteButton'
        return deleteButton;
    },
    setUpEventListener: function () {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function (event) {
            console.log(event.target.parentNode.id);
            //get element that was clicked on.
            var elementClicked = event.target;
            //check is the element that was clicked is deleteButton
            if (elementClicked.className === 'deleteButton') {
                handlers.deleteTodos(parseInt(elementClicked.parentNode.id)); //parseInt convert string to number
            }
        })
    }
};
view.setUpEventListener();
