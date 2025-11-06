const taskField = document.getElementById("task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// We'll use this to store the index of the task being edited (null when adding)
let editIndex = null;

function saveToLocalstorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let task = taskField.value.trim();
    if (task !== "") {
        if (editIndex !== null) {
            // **Edit Mode Logic:** Update the task at the stored index
            tasks[editIndex] = task;
            addTaskBtn.textContent = "Add Task"; // Reset button text
            editIndex = null; // Exit edit mode
        } else {
            // **Add Mode Logic:** Push a new task
            tasks.push(task);
        }

        saveToLocalstorage();
        taskField.value = ""; // Clear the input field
        displayTasks();
    }
}

// Global function to set up the edit state
function setupEdit(index, taskText) {
    taskField.value = taskText; // Fill the input field with the current task text
    taskField.focus(); // Focus on the input for immediate editing
    addTaskBtn.textContent = "Save Edit"; // Change button text to indicate edit mode
    editIndex = index; // Store the index of the task we are editing
}

function displayTasks() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        li.textContent = tasks[i];

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.classList.add("btn", "delete-task");

        const editTaskBtn = document.createElement("button"); // Renamed for clarity
        editTaskBtn.innerHTML = "Edit";
        editTaskBtn.classList.add("btn", "edit-task");

        // Event listener for Remove button
        removeBtn.addEventListener("click", () => {
            tasks.splice(i, 1);
            saveToLocalstorage();
            displayTasks();
        });

        // Event listener for Edit button - **Calls the global setupEdit function**
        editTaskBtn.addEventListener("click", () => {
            setupEdit(i, tasks[i]);
        });

        li.appendChild(editTaskBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }
}

displayTasks();
// Event listener calls addTask, which now handles both Add and Edit based on editIndex
addTaskBtn.addEventListener("click", addTask);