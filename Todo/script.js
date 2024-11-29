const inputField = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskContainer = document.getElementById('task-list');

let tasks = [];

addTaskBtn.addEventListener('click',() => {
    const task = inputField.value.trim();
    if(task === "") return;

    // creating object for the task
    const taskObject = {
        id: Date.now(),
        text: task,
        completed: false,
    }
    tasks.push(taskObject);
    inputField.value = "";

    console.log(tasks);
})