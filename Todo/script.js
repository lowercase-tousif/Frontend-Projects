document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task');
    const taskContainer = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = (task) => {
        const li = document.createElement('li');
        li.setAttribute('data-id',task.id);
        if(task.completed){
            li.classList.add('completed');
        }
        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>`;
        taskContainer.appendChild(li);

        // marking as done
        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        })
    }

    // rendering all the tasks
    tasks.forEach((task)=> renderTasks(task));

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
    })

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})