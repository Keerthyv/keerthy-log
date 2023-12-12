/*
Todo Task : (Task Name, Task Status)
Todo List : [Todo Task1, Todo Task2,......]
*/

// On window load, function load and display todo list
//  -- check local storage for todo tasks
//  -- display if available
//  -- Allow user to enter a new task
//  -- Add the task to the list below and display.
//  -- Allow user to delete tasks
//  -- 

window.onload = function() {

    const inputTask = document.getElementById("task");
    const listContainer = document.getElementById("display-todo");
    const form = document.getElementById("form");

    showData();
    form.addEventListener("submit", addTask);

    function addTask(event) {
        event.preventDefault();
        event.stopPropagation();

        console.log(inputTask.value);

        if (inputTask.value === '') {
            console.log("No tasks added yet");
        }

        else {
            console.log(inputTask.value);
            newTask = inputTask.value;
            localStorage.setItem('task', inputTask.value);
            let li = document.createElement("li");
            li.innerHTML = localStorage.getItem("task");
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            saveData();
                
        }
    }

    listContainer.addEventListener("click", function(e) {
        if(e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        }
        else if(e.target.tagName === "SPAN"){
            e.target.parentElement.remove();
            saveData();
        }
    }, false);

    }

    function saveData() {
        localStorage.setItem("data", document.getElementById("display-todo").innerHTML);
    }

    function showData() {
        document.getElementById("display-todo").innerHTML = localStorage.getItem("data");
    }