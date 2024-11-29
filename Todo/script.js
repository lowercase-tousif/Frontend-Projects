const inputField = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskContainer = document.getElementById('task-list');

let tasks = [];

addTaskBtn.addEventListener('click', () => {
    const task = inputField.value.trim();
    if (task === "") return;

    // generating random id
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const randId = `${hours}: ${minutes}: ${seconds}`;
    // creating object for the task
    const taskObject = {
        id: randId,
        text: task,
        completed: false,
    }
    tasks.push(taskObject);
    inputField.value = "";
    saveTasks();
    console.log(tasks);
})

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}