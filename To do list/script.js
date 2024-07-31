// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        } else if (e.target.classList.contains('edit-task')) {
            const index = e.target.dataset.index;
            const newTaskText = prompt('Edit task:', tasks[index].text);
            if (newTaskText !== null) {
                tasks[index].text = newTaskText.trim();
                saveTasks();
                renderTasks();
            }
        } else if (e.target.classList.contains('complete-task')) {
            const index = e.target.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="complete-task" data-index="${index}">✔️</button>
                    <button class="edit-task" data-index="${index}">✏️</button>
                    <button class="delete-task" data-index="${index}">❌</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
