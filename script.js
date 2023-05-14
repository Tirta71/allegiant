const table = document.querySelector("table");
const tableHeading = document.querySelector("table thead tr");
const form = document.getElementById("task-form");

window.addEventListener("DOMContentLoaded", function () {
  loadTasksFromStorage();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const task = taskInput.value;
  const deadline = dateInput.value;

  if (task.trim() === "" || deadline.trim() === "") {
    alert("Harap isi tugas dan deadline");
    return;
  }
  const newRow = createTaskRow(task, deadline);

  table.appendChild(newRow);

  taskInput.value = "";
  dateInput.value = "";

  saveTaskToStorage(task, deadline);
});

function createTaskRow(task, deadline) {
  const newRow = document.createElement("tr");

  const taskCell = document.createElement("td");
  taskCell.textContent = task;
  newRow.appendChild(taskCell);

  const deadlineCell = document.createElement("td");
  deadlineCell.textContent = deadline;
  newRow.appendChild(deadlineCell);

  const buttonCell = document.createElement("td");
  const editButton = createEditButton();
  const removeButton = createRemoveButton();
  buttonCell.appendChild(editButton);
  buttonCell.appendChild(removeButton);
  newRow.appendChild(buttonCell);

  return newRow;
}

function createEditButton() {
  const button = document.createElement("button");
  button.textContent = "Edit";
  button.classList.add("edit-button");
  button.addEventListener("click", function () {
    const taskCell = this.closest("tr").querySelector("td:first-child");
    editTask(taskCell);
  });
  return button;
}

function createRemoveButton() {
  const button = document.createElement("button");
  button.textContent = "Remove";
  button.classList.add("remove-button");
  button.addEventListener("click", function () {
    const taskCell = this.closest("tr").querySelector("td:first-child");
    removeTask(taskCell);
  });
  return button;
}

function saveTaskToStorage(task, deadline) {
  let tugas = getTasksFromStorage();

  if (!tugas) {
    tugas = [];
  }

  tugas.push({ task: task, deadline: deadline });

  localStorage.setItem("tasks", JSON.stringify(tugas));
}

function getTasksFromStorage() {
  const tugas = localStorage.getItem("tasks");

  if (!tugas || tugas === "undefined") {
    return [];
  }

  return JSON.parse(tugas);
}

window.addEventListener("DOMContentLoaded", function () {
  loadTasksFromStorage();
});

function loadTasksFromStorage() {
  const tugas = getTasksFromStorage();

  table.innerHTML = "";

  const headingRow = document.createElement("tr");

  const headingCell1 = document.createElement("th");
  headingCell1.textContent = "Tugas";
  headingRow.appendChild(headingCell1);

  const headingCell2 = document.createElement("th");
  headingCell2.textContent = "Deadline";
  headingRow.appendChild(headingCell2);

  const headingCell3 = document.createElement("th");
  headingCell3.textContent = "";
  headingRow.appendChild(headingCell3);

  table.appendChild(headingRow);

  tugas.forEach(function (task) {
    const newRow = createTaskRow(task.task, task.deadline);
    table.appendChild(newRow);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  loadTasksFromStorage();
});

function editTask(taskElement) {
  const task = taskElement.textContent;
  const newTask = prompt("Edit Tugas:", task);
  if (newTask !== null && newTask.trim() !== "") {
    const deadlineCell = taskElement.nextElementSibling; // Dapatkan elemen sel deadline berikutnya
    const deadline = deadlineCell.textContent;
    const newDeadline = prompt("Edit Deadline:", deadline); // Prompt untuk mengedit deadline
    if (newDeadline !== null && newDeadline.trim() !== "") {
      taskElement.textContent = newTask;
      deadlineCell.textContent = newDeadline;

      const taskRow = taskElement.parentElement;
      const taskIndex = Array.from(taskRow.parentElement.children).indexOf(
        taskRow
      );

      updateTaskInStorage(task, newTask, deadline, newDeadline, taskIndex);
    }
  }
  loadTasksFromStorage();
}

function removeTask(taskElement) {
  const task = taskElement.textContent;
  const taskRow = taskElement.parentElement;
  const taskIndex = Array.from(taskRow.parentElement.children).indexOf(taskRow);
  taskRow.remove();
  removeTaskFromStorage(taskIndex);
  loadTasksFromStorage();
}
