const taskInput = document.querySelector(".taskInput input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clearBtn"),
taskBox = document.querySelector(".taskBox");



let editId;
let isEditedTask = false;

let todos = JSON.parse(localStorage.getItem("todoList"));//local storage

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
})
function showTodo(filter) {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            //if task is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                li += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="option">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="taskMenu">
                            <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                            <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
            }
            
        });
    }
    taskBox.innerHTML = li || `<span>You don't have a task available.</span>`;
}
showTodo("all");

function showMenu(selectedTask) {
    //task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
    //removing show class from the task box on the document click
        if(e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(deleteId) {
    //remove selected task from array todos
    todos.splice(deleteId, 1);
    localStorage.setItem("todoList", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click", () => {
    //remove all array/todos
    todos.splice(0, todos.length);
    localStorage.setItem("todoList", JSON.stringify(todos));
    showTodo("all");

});

function updateStatus(selectedTask) {
    //task container/storage
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        //task status update done
        todos[selectedTask.id].status = "completed";
    }
    else {
        taskName.classList.remove("checked");
        //task status update pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todoList", JSON.stringify(todos));

}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditedTask) {// if isEditedTask not true
            if (!todos) {  //if todos not exist just pass an empty array
                todos = [];      
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);//add task
        }
        else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = ""; 
        localStorage.setItem("todoList", JSON.stringify(todos));
        showTodo("all");
    }
   
});
var dt = new Date();
document.getElementById('date-time').innerHTML=dt;
