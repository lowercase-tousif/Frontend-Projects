document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task');
    const taskContainer = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Render a single task
    const renderTask = (task) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.setAttribute('data-id', task.id);

        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>`;

        taskContainer.appendChild(li);

        // Mark task as completed when clicking on the text
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'SPAN') { // Only mark if the text is clicked
                task.completed = !task.completed;
                li.classList.toggle('completed');
                saveTasks();
            }
        });

        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the parent <li> click event
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
        });
    };

    // Render all tasks
    const renderTasks = () => {
        taskContainer.innerHTML = ''; // Clear the task list before rendering
        tasks.forEach((task) => renderTask(task));
    };

    // Add a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = inputField.value.trim();
        if (taskText === '') return;

        const taskObject = {
            id: Date.now().toString(), // Unique ID using timestamp
            text: taskText,
            completed: false,
        };

        tasks.push(taskObject);
        inputField.value = '';
        renderTask(taskObject);
        saveTasks();
        inputField.focus(); // Focus back to the input field
    });

    // Initial render of tasks
    renderTasks();
});
