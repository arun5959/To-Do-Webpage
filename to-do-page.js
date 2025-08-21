const toDoContainer = document.querySelector('.to-do-container');
const inputField = document.getElementById('enter-task');

function addTask() {
    let taskInput = inputField.value.trim();
    if (taskInput === "") return;

    let createTask = document.createElement("div");
    createTask.className = "to-do-child emerge"; // Add emerge class here
    createTask.innerHTML = `
        <div class="task-container">
            <p class="task">${taskInput}</p>
        </div> 
        <div class="task-actions">
            <button class="task-completed"><i class="fa-solid fa-check"></i></button>
            <button class="delete-task"><i class="fa-solid fa-trash"></i></button>
        </div>`;

    // Attach event listeners
    createTask.querySelector(".task-completed").addEventListener('click', changeBgColor);
    createTask.querySelector(".delete-task").addEventListener('click', deleteTask);

    toDoContainer.appendChild(createTask);

    // Remove emerge class after animation completes
    createTask.addEventListener('animationend', () => {
        createTask.classList.remove('emerge');
    });

    inputField.value = "";
}

function changeBgColor(event) {
    const btn = event.target.closest('button');
    if (!btn) return;
    const taskCard = btn.closest(".to-do-child");
    if (taskCard) {
        taskCard.style.backgroundColor = "#ADEBB3";
        taskCard.style.textDecoration = "line-through";

        // Fade out the completed button
        btn.classList.add('fade-out');

        setTimeout(() => {
            btn.remove();
        }, 1500); // Remove after animation
    }
}

function deleteTask(event) {
    const btn = event.target.closest('button');
    if (!btn) return;
    const taskCard = btn.closest(".to-do-child");
    if (taskCard) {
        taskCard.classList.add('fade-out');
        setTimeout(() => {
            taskCard.remove();
        }, 1500); // Remove after fade-out animation
    }
}

document.getElementById('submit-button').addEventListener('click', addTask);

inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission or default action
        addTask();
    }
});